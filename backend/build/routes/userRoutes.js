"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
// // import { authUser, deleteUserAsAdmin, getUserByIdAsAdmin, getUserProfile, getUsersAsAdmin, registerUesr, updateUserAsAdmin } from '../controllers/userController'
// import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware";
const router = express_1.default.Router();
// router.route("/");
//Route for Google Authorization
router.get("/login/success", (req, res) => {
    if (req.user) {
        console.log(req.user);
        res.status(200).json({
            error: false,
            message: "Successfully Loged In",
            user: req.user,
            //   token: generateToken(req.user.id),
        });
    }
    else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in failure",
    });
});
router.get("/auth/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect(process.env.CLIENT_URL);
// });
router.get('/', (req, res) => {
    console.log('hello there');
});
// router.post("/login", authUser);
// router.route("/profile");
exports.default = router;
