"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const packageController_1 = require("../controllers/packageController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router
    .route("/")
    .get(authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, packageController_1.getPackages)
    .post(authMiddleware_1.authMiddleware, packageController_1.addPackage);
router.route("/:id").get(packageController_1.getPackageById).put(authMiddleware_1.authMiddleware, packageController_1.updatePackageById);
exports.default = router;
