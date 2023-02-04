"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
// // import { authUser, deleteUserAsAdmin, getUserByIdAsAdmin, getUserProfile, getUsersAsAdmin, registerUesr, updateUserAsAdmin } from '../controllers/userController'
// import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware";
const router = express_1.default.Router();
// router.route("/");
router.post("/login", userController_1.authUser);
router.route("/profile");
exports.default = router;
