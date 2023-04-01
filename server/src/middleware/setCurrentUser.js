import UserService from "../user/user.service.js";

const setCurrentUser = async (req, res, next) => {
  console.log("Reached setCurrentUser middleware");
  console.log("Session email:", req.session.email);
  const { email } = req.session;

  console.log("Email from header:", email);

  if (email) {
    user = await UserService.getUserByEmail(email);

    console.log("User object:", user);

    if (!user) {
      console.error(
        "setCurrentUser.js: Could not find user with email:",
        email
      );
    } else {
      req.user = user;
    }
    next();
  } else {
    res.redirect("/");
  }
};
export default setCurrentUser;
