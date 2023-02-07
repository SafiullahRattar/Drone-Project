import express from "express";
import {
  addDelivery,
  getDeliveryById,
  getDeliveryByStatus,
  updateDeliveryById,
} from "../controllers/deliveryController";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// @route   POST api/delivery
// @desc    Create delivery
// @access  Public
router.post("/", authMiddleware, addDelivery);

// @route   GET api/delivery
// @desc    Get delivery by ID
// @access  Public
router.get("/:id", getDeliveryById);

// @route   GET api/delivery
// @desc    Get delivery by status
// @access  Public
router.get("/status/:status", getDeliveryByStatus);

// @route   PUT api/delivery/id
// @desc    Update delivery
// @access  Public
router.put("/:id", authMiddleware, adminMiddleware, updateDeliveryById);
export default router;
