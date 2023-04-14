import passport from "passport";
import UserService from "../user/index.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

function generateUniqueUsername(email, firstName, lastName) {
  const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${
    email.split("@")[0]
  }`;
  return username;
}

passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
     
      try {
       
        const id = profile.id;
        const email = profile.emails[0].value;
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;
        const profilePhoto = profile.photos[0].value;
        const source = "google";

        const currentUser = await UserService.getUserByEmail({ email });
        if (!currentUser) {
          let billingID;
          try {
            const stripeCustomer = await stripe.customers.create({
              email: email,
            });
            billingID = stripeCustomer.id;
          } catch (error) {
            console.error("Error creating Stripe customer:", error);
          }

          const newUser = await UserService.addGoogleUser({
            id,
            email,
            firstName,
            lastName,
            profilePhoto,
            billingID,
            username: generateUniqueUsername(email, firstName, lastName),
          });
          
          return done(null, newUser);
        }
      
        if (currentUser.source != "google") {
          return done(null, false, {
            message: `You have previously signed up with a different signin method`,
          });
        }

        if (!currentUser.billingID) {
          // If the user doesn't have a billingID, create a new Stripe customer and update the user with the billingID
          const stripeCustomer = await stripe.customers.create({
            email: email,
          });

          await UserService.updateUser(currentUser._id, {
            billingID: stripeCustomer.id,
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