import User from "./user.model.js";

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
const UserService = {
  addUser,
  getUsers,
  getUserByEmail,
  getUserByBillingID,
  updatePlan,
};

export default UserService;