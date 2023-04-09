import bodyParser from "body-parser";
import Stripe from "../connect/stripe.js";
import express from "express";
import UserService from "../src/user/user.service.js";

const router = express.Router();

router.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const sig = req.headers["stripe-signature"];
        console.log("Raw Body:", JSON.stringify(req.body));
      console.log("Stripe-Signature Header:", sig);
      const event = Stripe.createWebhook(req.body, sig);

      console.log("Processing event:", event.type);
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
          // started trial
          console.log("customer.subscription.updated");
          const user = await UserService.getUserByBillingID(data.customer);

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
            // cancelled
            console.log(
              "You just canceled the subscription" + data.canceled_at
            );
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
      }
      res.sendStatus(200);
    } catch (err) {
      console.log(`Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
);

export default router;
