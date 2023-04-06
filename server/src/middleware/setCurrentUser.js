import UserService from "../user/user.service.js";



const setCurrentUser = async (req, res, next) => {
  console.log("Reached setCurrentUser middleware");
  console.log("Request headers received:", req.headers);
  console.log("Session email:", req.session.email);
  const { email } = req.headers;

  console.log("Email from header:", email);

  if (email) {
    let foundUser = await UserService.getUserByEmail(email);

    console.log("User object:", foundUser);

    if (!foundUser) {
      console.error(
        "setCurrentUser.js: Could not find user with email:",
        email
      );
    } else {
      req.user = foundUser;
    }
    next();
  } else {
    res.redirect("/");
  }
};
export default setCurrentUser;
