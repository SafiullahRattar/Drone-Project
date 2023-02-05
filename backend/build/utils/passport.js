"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_1 = __importDefault(require("passport"));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.REACT_APP_GOOGLE_API_TOKEN,
    clientSecret: process.env.REACT_APP_GOOGLE_API_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"],
}, function (accessToken, refreshToken, profile, callback) {
    // console.log('------passport.ts ---')
    // console.log(profile)
    callback(null, profile);
}));
// passport.serializeUser((user, done) => {
//   done(null, user);
// });
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });
