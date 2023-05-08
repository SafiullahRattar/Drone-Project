import dotenv from "dotenv";
import connectDB from "./config/db";
import bp from "body-parser";
import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import packageRoutes from "./routes/packageRoutes";
import deliveryRoute from "./routes/deliveryRoute";
import pathRoutes from "./routes/pathRoutes";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import passport from "passport";
import session from "express-session";
import { generateToken } from "./utils/generateToken";
import { authMiddleware } from "./middleware/authMiddleware";
import { authUser } from "./controllers/userController";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes";
import morgan from "morgan";

const app = express();
dotenv.config();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

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
app.use(morgan("dev"));

app.use(passport.initialize());
app.use(passport.session());

require("./utils/passport");
connectDB();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use("/api/admin", adminRoutes);

app.use("/api/users", userRoutes);
app.use("/api/package", packageRoutes);
app.use("/api/delivery", deliveryRoute);
app.use('/api/path',  pathRoutes)

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
