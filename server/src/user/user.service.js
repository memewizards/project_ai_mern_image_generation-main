import User from "./user.model.js";

const addGoogleUser =
  (User) =>
  ({ id, email, firstName, lastName, profilePhoto }) => {
    const user = new User({
      id,
      email,
      firstName,
      lastName,
      profilePhoto,
      source: "google",
    });
    return user.save();
  };


const addLocalUser =
  (User) =>
  ({ id, email, firstName, lastName, password }) => {
    const user = new User({
      id,
      email,
      firstName,
      lastName,
      password,
      source: "local",
    });
    return user.save();
  };

const addUser =
  (User) =>
  ({ email, billingID, plan, endDate }) => {
    if (!email || !billingID || !plan) {
      throw new Error(
        "Missing Data. Please provide values for email, billingID, plan"
      );
    }

    const user = new User({ email, billingID, plan, endDate });
    return user.save();
  };

const getUsers = (User) => () => {
  return User.find({});
};

const getUserByEmail =
  (User) =>
  async ({ email }) => {
    return await User.findOne({ email });
  };

const getUserByBillingID = (User) => async (rsbillingID) => {
  return await User.findOne({ billingID });
};

const updatePlan = (User) => (email, plan) => {
  return User.findOneAndUpdate({ email, plan });
};

const UserService = {
  addGoogleUser: addGoogleUser(User),
  addLocalUser: addLocalUser(User),
  addUser: addUser(User),
  getUsers: getUsers(User),
  getUserByEmail: getUserByEmail(User),
  updatePlan: updatePlan(User),
  getUserByBillingID: getUserByBillingID(User),
};

export default UserService;
