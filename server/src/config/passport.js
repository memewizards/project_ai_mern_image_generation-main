import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../user/user.model.js";
import UserService from "../user/user.service.js";

import bcrypt from "bcrypt";

passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Deserializing user with id:", id);
  const currentUser = await User.findOne({ id });
  console.log("Deserialized user:", currentUser);
  done(null, currentUser);
});

export default passport;
