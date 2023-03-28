import express from "express";
import UserService from "../src/user/user.service.js";

const router = express.Router();

router.post("/userLogin", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user already exists
    let user = await UserService.getUserByEmail(email);

    // If the user does not exist, create a new user with a default plan
    if (!user) {
      user = await UserService.addUser({
        email,
        billingID: "defaultBillingID",
        plan: "none",
        endDate: null,
      });
    }

    // Set the email in the session
    req.session.email = email;

    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

export default router;
