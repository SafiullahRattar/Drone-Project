import express from "express";
import { authUser } from "../controllers/userController";
// // import { authUser, deleteUserAsAdmin, getUserByIdAsAdmin, getUserProfile, getUsersAsAdmin, registerUesr, updateUserAsAdmin } from '../controllers/userController'
// import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// router.route("/");

router.post("/login", authUser);

router.route("/profile")


export default router;
