import dotenv from "dotenv";
import connectDB from "./config/db";
import bp from "body-parser";
import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import passport from "passport";
import session from "express-session";
import { generateToken } from "./utils/generateToken";
import { authMiddleware } from "./middleware/authMiddleware";
import { authUser } from "./controllers/userController";

const app = express();
dotenv.config();

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "bla bla bla",
    // store: new mongoose({
    //   url: process.env.MONGODB_URI,
    //   collection: 'sessions'
    // })
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./utils/passport");
connectDB();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    // successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
    session: false,
  }),
  authUser
);

app.use("/hello", (req, res) => {
  res.send("hello world");
});
// app.use('/api/orders',orderRoutes)

app.get("/", authMiddleware, (req, res) => {});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
