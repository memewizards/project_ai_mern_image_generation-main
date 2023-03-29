import mongoose from "mongoose";


const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  billingID: String,
  plan: { type: String, enum: ["none", "basic", "pro"], default: "none" },
  hasTrial: { type: Boolean, default: false },
  endDate: { type: Date, default: null },
});

const User = mongoose.model("user", userSchema, "user");

const addUser = ({ email, billingID, plan, endDate }) => {
  if (!email || !billingID || !plan) {
    throw new Error(
      "Missing Data. Please provide values for email, billingID, plan"
    );
  }
  

  const user = new User({ email, billingID, plan, endDate });
  return user.save();
};

const getUsers = () => {
  return User.find({});
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const getUserByBillingID = async (billingID) => {
  return await User.findOne({ billingID });
};

const updatePlan = (email, plan) => {
  return User.findOneAndUpdate({ email }, { plan });
};

const userModel = mongoose.model("user", userSchema, "user");

export default userModel;
