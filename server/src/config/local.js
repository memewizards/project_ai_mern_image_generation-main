import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserService from '../user/user.service.js';
import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(async function (email, password, done) {
    const currentUser = await UserService.getUserByEmail({ email });

    if (!currentUser) {
      return done(null, false, {
        message: `User with email ${email} does not exist`,
      });
    }

    if (currentUser.source != "local") {
      return done(null, false, {
        message: `You have previously signed up with a different signin method`,
      });
    }

    if (!bcrypt.compareSync(password, currentUser.password)) {
      return done(null, false, { message: `Incorrect password provided` });
    }
    return done(null, currentUser);
  })
);
