// server/routes/stripeRoutes.js
import express from "express";
import stripe from "../connect/stripe.js";
const { getCustomerByID, addNewCustomer } = stripe;


const router = express.Router();

router.post("/add-customer", async (req, res) => {
  const { email } = req.body;
  const customer = await addNewCustomer(email);
  res.json(customer);
});


router.get("/customer/:id", async (req, res) => {
  const { id } = req.params;
  const customer = await getCustomerByID(id);
  res.json(customer);
});

export default router;