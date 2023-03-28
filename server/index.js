import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import runPodRoutes from "./routes/runPodRoutes.js";
import userLoginRoutes from "./routes/userLoginRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import Stripe from "./connect/stripe.js";
import session from "express-session";
import User from "./src/user.model.js";
import UserService from "./src/user.service.js";
import hasPlan from "./src/middleware/hasPlan.js";
import setCurrentUser from "./src/middleware/setCurrentUser.js";


import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser"; // Import cookie-parser



dotenv.config();
const app = express();

app.use(express.json());



app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your client's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: "Content-Type, Authorization, X-Requested-With",
  })
);

app.use(cookieParser()); // Use cookie-parser middleware

app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/runpod", runPodRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);
app.use("/userLogin", userLoginRoutes);
app.use("/api/v1/stripe", stripeRoutes);
app.use("/api/v1/account", accountRoutes);

app.use("/api/v1", (req, res, next) => {
  next();
});

app.use(
  session({
    secret: "keyboard cat", // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    rolling: true, // Add this line
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: false, // Set to true if you are using HTTPS
      sameSite: "lax",
    },
  })
);


app.get("/api/v1/getCustomerId", setCurrentUser, (req, res) => {
  console.log("Session:", req.session);
  if (req.session && req.session.customerID) {
    console.log("Sending customerID:", req.session.customerID);
    res.json({ customerId: req.session.customerID });
  } else {
    console.log("No customerID found in session.");
    res.status(400).json({ error: "No customerID found in session." });
  }
});


app.post("/userlogin", async (req, res) => {
  const { email } = req.body;
  const customer = await Stripe.addNewCustomer(email);
  if (customer && customer.id) {
    req.session.customerID = customer.id;

    // Set the cookie with the customer ID
    res.cookie("customerID", customer.id, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.json({ customerId: customer.id });

    // Log the session after setting the customer ID
    console.log("Session after setting customerID:", req.session);
  } else {
    res.status(400).json({ error: "Failed to create customer." });
  }
});


app.get(
  "/none",
  [setCurrentUser, hasPlan("none")],
  async function (req, res, next) {
    res.status(200).render("none.ejs");
  }
);

app.get(
  "/basic",
  [setCurrentUser, hasPlan("basic")],
  async function (req, res, next) {
    res.status(200).render("basic.ejs");
  }
);

app.get(
  "/pro",
  [setCurrentUser, hasPlan("pro")],
  async function (req, res, next) {
    res.status(200).render("pro.ejs");
  }
);

app.get("/api/v1/account", async function (req, res) {
  try {
    const customer = await UserService.getUserByEmail(req.session.email);
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
    } else {
      res.json({ customer });
    }
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/checkout", setCurrentUser, async (req, res) => {
  const customer = req.user;
  const { product, customerID } = req.body;

  const price = productToPriceMap[product];

  try {
    const session = await Stripe.createCheckoutSession(customerID, price);

    const ms =
      new Date().getTime() + 1000 * 60 * 60 * 24 * process.env.TRIAL_DAYS;
    const n = new Date(ms);

    customer.plan = product;
    customer.hasTrial = true;
    customer.endDate = n;
    customer.save();

    res.send({
      sessionId: session.id,
    });
  } catch (e) {
    console.log(e);
    res.status(400);
    return res.send({
      error: {
        message: e.message,
      },
    });
  }
});

app.post("/billing", setCurrentUser, async (req, res) => {
  const { customer } = req.body;
  console.log("customer", customer);

  const session = await Stripe.createBillingSession(customer);
  console.log("session", session);

  res.json({ url: session.url });
});

app.post("/webhook", async (req, res) => {
  let event;

  try {
    event = Stripe.createWebhook(req.body, req.header("Stripe-Signature"));
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }

  const data = event.data.object;

  console.log(event.type, data);
  switch (event.type) {
    case "customer.created":
      console.log(JSON.stringify(data));
      break;
    case "invoice.paid":
      break;
    case "customer.subscription.created": {
      const user = await UserService.getUserByBillingID(data.customer);

      if (data.plan.id === process.env.PRODUCT_BASIC) {
        console.log("You are talking about basic product");
        user.plan = "basic";
      }

      if (data.plan.id === process.env.PRODUCT_PRO) {
        console.log("You are talking about pro product");
        user.plan = "pro";
      }

      user.hasTrial = true;
      user.endDate = new Date(data.current_period_end * 1000);

      await user.save();

      break;
    }
    case "customer.subscription.updated": {
      const user = await UserService.getUserByBillingID(data.customer);

      if (data.plan.id == process.env.PRODUCT_BASIC) {
        console.log("You are talking about basic product");
        user.plan = "basic";
      }

      if (data.plan.id === process.env.PRODUCT_PRO) {
        console.log("You are talking about pro product");
        user.plan = "pro";
      }

      const isOnTrial = data.status === "trialing";

      if (isOnTrial) {
        user.hasTrial = true;
        user.endDate = new Date(data.current_period_end * 1000);
      } else if (data.status === "active") {
        user.hasTrial = false;
        user.endDate = new Date(data.current_period_end * 1000);
      }

      if (data.canceled_at) {
        console.log("You just canceled the subscription" + data.canceled_at);
        user.plan = "none";
        user.hasTrial = false;
        user.endDate = null;
      }
      console.log("actual", user.hasTrial, data.current_period_end, user.plan);

      await user.save();
      console.log("customer changed", JSON.stringify(data));
      break;
    }
    default:
  }
  res.sendStatus(200);
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
