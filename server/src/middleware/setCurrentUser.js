import UserService from "../user.service.js";

async function setCurrentUser(req, res, next) {
  const { email } = req.session;

  if (email) {
    const user = await UserService.getUserByEmail(email);

    req.user = user;
    next();
  } else {
    res.redirect("/");
  }
}

export default setCurrentUser;
