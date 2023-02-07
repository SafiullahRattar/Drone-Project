"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deliveryController_1 = require("../controllers/deliveryController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// @route   POST api/delivery
// @desc    Create delivery
// @access  Public
router.post("/", authMiddleware_1.authMiddleware, deliveryController_1.addDelivery);
// @route   GET api/delivery
// @desc    Get delivery by ID
// @access  Public
router.get("/:id", deliveryController_1.getDeliveryById);
// @route   GET api/delivery
// @desc    Get delivery by status
// @access  Public
router.get("/status/:status", deliveryController_1.getDeliveryByStatus);
// @route   PUT api/delivery/id
// @desc    Update delivery
// @access  Public
router.put("/:id", authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, deliveryController_1.updateDeliveryById);
exports.default = router;
