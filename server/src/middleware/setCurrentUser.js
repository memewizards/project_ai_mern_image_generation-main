import UserService from "../user/user.service.js";

const setCurrentUser = async (req, res, next) => {
  console.log("Session in setCurrentUser:", req.session);

  if (req.session && req.session.customerID) {
    const user = await UserService.getUserByBillingID(req.session.customerID);
    console.log("User in setCurrentUser:", user);
    if (user) {
      req.user = user;
    } else {
      console.log("No user found for customerID:", req.session.customerID);
    }
  } else {
    console.log("No customerID found in session in setCurrentUser.");
  }

  next();
};
export default setCurrentUser;
