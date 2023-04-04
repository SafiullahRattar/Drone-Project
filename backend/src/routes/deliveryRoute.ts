import express from "express";
import {
  addDelivery,
  getDeliveryById,
  getDeliveryByStatus,
  getDeliveryByUserId,
  updateDeliveryById,
} from "../controllers/deliveryController";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// @route   POST api/delivery
// @desc    Create delivery
// @access  Public
router.post("/", authMiddleware, addDelivery);

// @route   GET api/delivery/user
// @desc    Get delivery list by user ID
// @access  Public
router.get("/user", authMiddleware, getDeliveryByUserId);

// @route   GET api/delivery
// @desc    Get delivery by status
// @access  Public
router.get("/status/:status", getDeliveryByStatus);

// @route   GET api/delivery
// @desc    Get delivery by ID
// @access  Public
router
  .route("/:id")
  .get(getDeliveryById)
  // .put(authMiddleware, adminMiddleware, updateDeliveryById);

// @route   PUT api/delivery/id
// @desc    Update delivery
// @access  Public
export default router;
