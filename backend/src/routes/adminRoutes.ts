import express from "express";
import {
  getAllDeliveries,
  updateDeliveryStatus_Admin,
} from "../controllers/deliveryController";
import {
  addDrone,
  deleteDrone,
  getAllDrones,
  getDroneById,
  updateDrone,
} from "../controllers/droneController";
import {
  deleteUser_Admin,
  getAllUsers_Admin,
  updateUser_Admin,
} from "../controllers/userController";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware";

const adminRoutes = express.Router();

// Apply admin middleware to all routes in this router
adminRoutes.use(authMiddleware, adminMiddleware);

// DELIVERY
// Update the status of an Delivery by ID
adminRoutes.put("/orders/:id/status", updateDeliveryStatus_Admin);
//Get all the deliveries
adminRoutes.get("/orders", getAllDeliveries);

// Drones
adminRoutes.get("/drones/:id", getDroneById);
adminRoutes.get("/drones", getAllDrones);
adminRoutes.post("/drones", addDrone);
adminRoutes.delete("/drones/:id", deleteDrone);
adminRoutes.put("/drones/:id", updateDrone);

// Customers

adminRoutes.get("/users", getAllUsers_Admin);
adminRoutes.put("/users/:id", updateUser_Admin);
adminRoutes.delete("/users/:id", deleteUser_Admin);

// Price Plans
// adminRoutes.post("/price-plans", authenticateAdmin, addPricePlan);
// adminRoutes.put("/price-plans/:id", authenticateAdmin, updatePricePlan);
// adminRoutes.delete("/price-plans/:id", authenticateAdmin, deletePricePlan);

export default adminRoutes;
