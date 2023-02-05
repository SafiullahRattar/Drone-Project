import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.REACT_APP_GOOGLE_API_TOKEN!,
      clientSecret: process.env.REACT_APP_GOOGLE_API_SECRET!,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
        // console.log('------passport.ts ---')
        // console.log(profile)
      callback(null, profile);
    }
  )
);

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });
