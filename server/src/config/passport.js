import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../user/user.model.js";
import UserService from "../user/user.service.js";

import bcrypt from "bcrypt";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const currentUser = await User.findOne({ id });
  done(null, currentUser);
});

export default passport;
