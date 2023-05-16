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
import { authUser } from "./controllers/userController";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes";
import morgan from "morgan";
import path from "path";

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
app.use("/api/admin/path", pathRoutes);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    // successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
    session: false,
  }),
  authUser
);

if (process.env.NODE_ENV === "production") {
  // if(true){
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "uploads/image-1645260047444.png"));
    res.send("Api is running " + __dirname);
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  console.log("NODE_ENV: ", process.env.NODE_ENV);
});
