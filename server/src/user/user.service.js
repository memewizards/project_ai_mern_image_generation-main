import User from "../user/user.model.js";

const addGoogleUser =
  (User) =>
  ({ id, email, firstName, lastName, profilePhoto, billingID }) => {
    const user = new User({
      id,
      email,
      firstName,
      lastName,
      profilePhoto,
      source: "google",
      billingID,
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

const getUserByEmail = (User) => async (emailOrObj) => {
  
  const email = typeof emailOrObj === "string" ? emailOrObj : emailOrObj.email;
  const user = await User.findOne({ email });
  
  return user;
};

const getUserByBillingID = (User) => async (billingID) => {
  return await User.findOne({ billingID });
};

const updatePlan = (User) => (email, plan) => {
  return User.findOneAndUpdate({ email, plan });
};

const subtractTokens = (User) => (email, tokensToSubtract) => async () => {
  
  if (User) {
    User.tokenBalance -= tokensToSubtract;
    // If the balance goes negative, set it to zero
    if (User.tokenBalance < 0) {
      User.tokenBalance = 0;
    }
    await User.save();
  } else {
    throw new Error(`User with email ${email} not found`);
  }
}

const updateUser = (model) => async (id, updatedData) => {
  try {
    const user = await model.findByIdAndUpdate(id, updatedData, { new: true });
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const UserService = {
  addGoogleUser: addGoogleUser(User),
  addLocalUser: addLocalUser(User),
  addUser: addUser(User),
  getUsers: getUsers(User),
  getUserByEmail: getUserByEmail(User),
  updatePlan: updatePlan(User),
  getUserByBillingID: getUserByBillingID(User),
  subtractTokens: subtractTokens(User),
  updateUser: updateUser(User),
};

export default UserService;
