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
import url from "url";
import path from "path";
import User from "./src/user/user.model.js";
import UserService from "./src/user/user.service.js";
import hasPlan from "./src/middleware/hasPlan.js";
import setCurrentUser from "./src/middleware/setCurrentUser.js";
import passport from "./src/config/passport.js";
import * as GoogleStrategy from "./src/config/google.js";
import * as LocalStrategy from "./src/config/local.js";
import bodyParser from "body-parser";
import flash from "connect-flash";
import getRawBody from "raw-body";
import https from "https";
import fs from "fs";
import cookieParser from "cookie-parser";
import * as uuid from "uuid";
import bcrypt from "bcrypt";
import "./src/config/google.js";
import jwt from "jsonwebtoken";
import Post from '../server/mongodb/models/post.js'; // Import your Post model

import customerRoutes from "./routes/customerRoutes.js";
import StripeModule from "./connect/stripe.js";
// ...
const { retrieveSubscription } = StripeModule;
// Add this line after other route middlewares


dotenv.config();
const app = express();
const router = express.Router();
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    let event = request.body;
    console.log(JSON.stringify(request.body));

    if (endpointSecret) {
      const signature = request.headers["stripe-signature"];
      try {
        event = Stripe.createWebhook(request.body, signature);
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }

    const data = event.data.object;
    console.log(event.type, data);

    switch (event.type) {
      case "customer.created":
        console.log(JSON.stringify(data));
        break;

      case "invoice.paid": {
        const user = await UserService.getUserByBillingID(data.customer);
        console.log("the user's invoice was paid.", data.customer);
        if (!user) {
          console.log(`customer.created: User not found for billing ID ${data.customer}`);
          return response.sendStatus(400);
        }

        const subscription = data.lines.data[0].subscription;
        const currentSubscription = await retrieveSubscription(subscription);
      

        if (currentSubscription.plan.id === process.env.PRODUCT_BASIC) {
          console.log("You are talking about basic product");
          user.tokenBalance += 200; // Add tokens for basic plan
        }

        if (currentSubscription.plan.id === process.env.PRODUCT_PRO) {
          console.log("You are talking about pro product");
          user.tokenBalance += 450; // Add tokens when subscribing to the basic plan
        }

        await user.save();

        break;
      }

      case "customer.subscription.created": {
        const user = await UserService.getUserByBillingID(data.customer);
        console.log("the user's subscription was created.", data.customer);
        if (!user) {
          console.log(
            `customer.subscription.created: User not found for billing ID ${data.customer}`
          );
          return response.sendStatus(400);
        }

        if (data.plan.id === process.env.PRODUCT_BASIC) {
          console.log("You are talking about basic product");
          user.plan = "basic";
          user.tokenBalance += 200; // Add tokens when subscribing to the basic plan
        }

        if (data.plan.id === process.env.PRODUCT_PRO) {
          console.log("You are talking about pro product");
          user.plan = "pro";
          user.tokenBalance += 450; // Add tokens when subscribing to the basic plan
        }

        user.hasTrial = true;
        user.endDate = new Date(data.current_period_end * 1000);

        await user.save();

        break;
      }

      case "customer.subscription.updated": {
        const user = await UserService.getUserByBillingID(data.customer);
        console.log("the user's subscription was updated.", data.customer)
        if (!user) {
          console.log(
            `customer.subscription.updated: User not found for billing ID ${data.customer}`
          );
          return response.sendStatus(400);
        }

        const previousPlan = user.plan; // Store the previous plan

        if (data.plan.id === process.env.PRODUCT_BASIC) {
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

        console.log(
          "actual",
          user.hasTrial,
          data.current_period_end,
          user.plan
        );

        await user.save();

        console.log("customer changed", JSON.stringify(data));

        break;
      }

      default:
        break;
    }

    response.sendStatus(200);
  }
);


app.use("/webhook", router);
app.use(
  cors({
    origin: "https://dreambrainai.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders:
      "Content-Type, Authorization, X-Requested-With, email, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Headers",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(flash());




app.use(
  "/api/v1/runpod",
  passport.authenticate("jwt", { session: false }),
  runPodRoutes
);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);
app.use("/userLogin", userLoginRoutes);
app.use("/api/v1/stripe", stripeRoutes);
app.use("/api/v1/account", accountRoutes);

app.use("/api/v1", (req, res, next) => {
  next();
});
app.use(customerRoutes);
app.use(
  session({
    secret: "secr3t",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true if you are using HTTPS
      sameSite: "lax",
    },
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (!req.session) {
    console.error("Session initialization failed");
    return res.status(500).json({ error: "Internal server error" });
  }
  next();
});


app.put("/post/:postId/upvote", async (req, res) => {
  const postId = req.params.postId;
  const post = await Post.findByIdAndUpdate(
    postId,
    { $inc: { upvotes: 1 } },
    { new: true }
  );
  res.json(post);
});

app.put("/post/:postId/downvote", async (req, res) => {
  const postId = req.params.postId;
  const post = await Post.findByIdAndUpdate(
    postId,
    { $inc: { downvotes: 1 } },
    { new: true }
  );
  res.json(post);
});


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
  console.log("User login request received");
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
const isLoggedIn = (req, res, next) => {
  console.log(`is loggedin: Authorization header: ${req.headers.authorization}`);
  req.user ? next() : res.sendStatus(401);
};



app.get("/", (req, res) => {
  
});



// app.get("/", (req, res) => {
//   res.render("index.ejs");
// });

// app.get("/signup", (req, res) => {
//   res.status(200).json({ message: "Internal server error" });
// });

// app.get("/page/signin", (req, res) => {
//   res.render("local/signin.ejs");
// });

app.get("/profile", isLoggedIn, (req, res) => {
  
  if (req.user) {
    res.json({ user: req.user });
    console.log("this is the user. isLoggedIn is true")
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.get("/account", isLoggedIn, (req, res) => {
  
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).json({ message: "Error logging out" });
    } else {
      res.status(200).json({ message: "Logged out successfully" });
    }
  });
});

app.get("/getTokenBalance", isLoggedIn, async (req, res) => {
  console.log("Requested token balance");

  // Make sure the user is authenticated before proceeding
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { email } = req.query; // Extract the email value from the query string

  try {
    const user = await UserService.getUserByEmail({ email });

    if (!user) {
      console.log(`app.js: Could not find user with email: ${email}`);
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ tokenBalance: user.tokenBalance }); // Send the token balance back to the client
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});



// Route for adding tokens to a user's token balance
// app.post("/add-tokens", async (req, res) => {
//   console.log(req.user);
//   const { email, tokensToAdd } = req.body;

//   if (typeof tokensToAdd !== "number" || isNaN(tokensToAdd)) {
//     return res.status(400).send({ error: "Invalid tokensToAdd value" });
//   }
//   try {
//     const user = await UserService.getUserByEmail({ email });

//     if (!user) {
//       console.log(`app.js: Could not find user with email: ${email}`);
//       return res.status(404).json({ error: "User not found" });
//     }

//     user.tokenBalance += tokensToAdd;
//     await user.save();

//     res.send({ success: true, user }); // send a response to the client indicating success
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: "Internal server error" });
//   }
// });

// Route for subtracting tokens from a user's token balance
app.post("/subtract-tokens-ijge23tGe", async (req, res) => {
  console.log(req.user);
  const { email, tokensToSubtract } = req.body;

  if (typeof tokensToSubtract !== "number" || isNaN(tokensToSubtract)) {
    return res.status(400).send({ error: "Invalid tokensToSubtract value" });
  }
  try {
    const user = await UserService.getUserByEmail({ email });

    if (!user) {
      console.log(`app.js: Could not find user with email: ${email}`);
      return res.status(404).json({ error: "User not found" });
    }

    if (user.tokenBalance < tokensToSubtract) {
      return res.status(403).send({ error: "Insufficient tokens" });
    }

    user.tokenBalance -= tokensToSubtract;
    await user.save();

    res.send({ success: true, tokenBalance: user.tokenBalance }); // send a response to the client indicating success
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});


// Route for adding tokens to a user's token balance
app.post("/add-tokens", async (req, res) => {
  const { email, tokensToAdd } = req.body;

  if (typeof tokensToAdd !== "number" || isNaN(tokensToAdd)) {
    return res.status(400).send({ error: "Invalid tokensToAdd value" });
  }
  try {
    const user = await UserService.getUserByEmail({ email });

    if (!user) {
      console.log(`app.js: Could not find user with email: ${email}`);
      return res.status(404).json({ error: "User not found" });
    }

    user.tokenBalance += tokensToAdd;
    await user.save();

    res.send({ success: true, user }); // send a response to the client indicating success
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.get("/auth/google", (req, res, next) => {
  console.log("Reached /auth/google route");
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
});

app.get("/auth/google/callback", (req, res, next) => {
  console.log("Reached /auth/google/callback route");
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      return res.redirect("/g");
    }
    req.logIn(user, (err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      req.session.email = user.email;
      console.log("Session after login:", req.session);

      // Create and sign the JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      // Redirect to the client-side, passing the JWT token as a query parameter
      return res.redirect(`http://localhost:5173/profile?token=${token}`);
    });
  })(req, res, next);
});


app.get(
  "/none",
  [setCurrentUser, hasPlan("none")],
  async function (req, res, next) {
    res.status(200).render("none.ejs");
  }
);

app.get(
  "/BasicPlan",
  [setCurrentUser, hasPlan("BasicPlan")],
  async function (req, res, next) {
    res.status(200).render("BasicPlan.ejs");
  }
);

app.get(
  "/ProPlan",
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

const productToPriceMap = {
  basic: process.env.PRODUCT_BASIC,
  pro: process.env.PRODUCT_PRO,
};

app.post("/checkout", setCurrentUser, async (req, res) => {
  console.log("Checkout route hit");

  const user = req.user;
  const { product, customerID } = req.body;

  console.log("User:", user);
  console.log("Product:", product);
  console.log("CustomerID:", customerID);

  const price = productToPriceMap[product];

  try {
    const session = await Stripe.createCheckoutSession(customerID, price);

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
  console.log("Session email:", req.session.email); // Added console.log for session email
  console.log("Email from header:", req.headers.email); // Added console.log for email from header

  const { email } = req.body;

  try {
    const userEmail = req.body.email;
    const user = await UserService.getUserByEmail({ email });
    const { customer } = req.body;
    console.log("customer", customer);

    const session = await Stripe.createBillingSession(customer);
    console.log("session", session);
    //res.redirect('https://billing.stripe.com/p/login/test_3csdU4cnx1S41mo288');
    res.json({ url: session.url });
  } catch (error) {
    console.error("Error in /billing route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/user/:username", async (req, res) => {
  const username = req.params.username; 
  const userProfile = await UserService.getUserProfile(username);

  if (userProfile) {
    res.json(userProfile);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});


//this may be used to allow the user to save photos
// Get the equivalent of __dirname
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const server = https.createServer(
//   {
//     key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
//     cert: fs.readFileSync(path.join(__dirname, "localhost.pem")),
//   },
//   app
// );

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    //app.listen(8080, () => console.log("Server started on port 8080"));
    app.listen('0.0.0.0', () => console.log("Server started on port 0000"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
