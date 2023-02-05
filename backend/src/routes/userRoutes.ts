import express from "express";
import passport from "passport";
import { authUser, getUserProfile } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import { generateToken } from "../utils/generateToken";
// // import { authUser, deleteUserAsAdmin, getUserByIdAsAdmin, getUserProfile, getUsersAsAdmin, registerUesr, updateUserAsAdmin } from '../controllers/userController'
// import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(authUser);

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.route("/profile").get(authMiddleware, getUserProfile);

export default router;
