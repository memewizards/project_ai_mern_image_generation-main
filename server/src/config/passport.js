import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../user/user.model.js";
import UserService from "../user/user.service.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";


import bcrypt from "bcrypt";

passport.serializeUser((user, done) => {
  
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  
  const currentUser = await User.findOne({ id });
  
  done(null, currentUser);
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtVerify = async (jwtPayload, done) => {
  try {
    console.log("JWT payload:", jwtPayload);
    const user = await UserService.getUserByEmail(jwtPayload.email);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
};



passport.use(new JwtStrategy(jwtOptions, jwtVerify));

export default passport;
