"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const pathController_1 = require("../controllers/pathController");
const router = express_1.default.Router();
router
    .route("/")
    .get(authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, pathController_1.getPaths)
    .post(authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, pathController_1.addPath);
exports.default = router;
