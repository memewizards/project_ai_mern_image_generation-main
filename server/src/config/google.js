import passport from "passport";
import UserService from "../user/index.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("GoogleStrategy called with profile:", profile);
        const id = profile.id;
        const email = profile.emails[0].value;
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;
        const profilePhoto = profile.photos[0].value;
        const source = "google";

        const currentUser = await UserService.getUserByEmail({ email });
        console.log("a google strategy was used");
        if (!currentUser) {
          const newUser = await UserService.addGoogleUser({
            id,
            email,
            firstName,
            lastName,
            profilePhoto,
          });
          console.log("User object before serializeUser:", user);
          return done(null, newUser);
        }
        console.log(currentUser);
        if (currentUser.source != "google") {
          return done(null, false, {
            message: `You have previously signed up with a different signin method`,
          });
        }

        currentUser.lastVisited = new Date();
        return done(null, currentUser);
      } catch (error) {
        console.error("GoogleStrategy error:", error);
        return done(error);
      }
    }
  )
);

