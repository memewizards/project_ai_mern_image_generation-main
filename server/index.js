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

import MemoryStoreFactory from "memorystore";
import MongoStore from "connect-mongo";
const MemoryStore = MemoryStoreFactory(session);

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

app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/runpod", runPodRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);
app.use("/userLogin", userLoginRoutes);
app.use("/api/v1/stripe", stripeRoutes);
app.use("/api/v1/account", accountRoutes);


app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
  })
);

app.post("/userlogin", async (req, res) => {
  const { email } = req.body;
  const customer = await Stripe.addNewCustomer(email);
  req.session.customerID = customer.id;
  const response = {
    message: "Customer created",
    customerId: customer.id,
  };
  res.send(JSON.stringify(response));
});



app.get('/none', [setCurrentUser, hasPlan('none')], async function (
  req,
  res,
  next
) {
  res.status(200).render('none.ejs')
})

app.get('/basic', [setCurrentUser, hasPlan('basic')], async function (
  req,
  res,
  next
) {
  res.status(200).render('basic.ejs')
})

app.get('/pro', [setCurrentUser, hasPlan('pro')], async function (
  req,
  res,
  next
) {
  res.status(200).render('pro.ejs')
})

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


app.get('/none', [setCurrentUser, hasPlan('none')], async function (
  req,
  res,
  next
) {
  res.status(200).render('none.ejs')
})

app.get('/basic', [setCurrentUser, hasPlan('basic')], async function (
  req,
  res,
  next
) {
  res.status(200).render('basic.ejs')
})

app.get('/pro', [setCurrentUser, hasPlan('pro')], async function (
  req,
  res,
  next
) {
  res.status(200).render('pro.ejs')
})


app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from DALL.E!",
  });
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
