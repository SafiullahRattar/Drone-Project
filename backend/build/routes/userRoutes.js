"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
// // import { authUser, deleteUserAsAdmin, getUserByIdAsAdmin, getUserProfile, getUsersAsAdmin, registerUesr, updateUserAsAdmin } from '../controllers/userController'
// import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware";
const router = express_1.default.Router();
router.route("/").get(userController_1.authUser);
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in failure",
    });
});
router.get("/auth/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
}));
router.route("/profile").get(authMiddleware_1.authMiddleware, userController_1.getUserProfile);
exports.default = router;
