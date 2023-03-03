import express from 'express';
import { updateDeliveryStatus_Admin } from '../controllers/deliveryController';
import { deleteUser_Admin, getAllUsers_Admin, updateUser_Admin } from '../controllers/userController';
import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware';

const adminRoutes = express.Router();

// Apply admin middleware to all routes in this router
adminRoutes.use(authMiddleware, adminMiddleware);

// DELIVERY
// Update the status of an Delivery by ID
adminRoutes.put('/orders/:id/status', updateDeliveryStatus_Admin);
// adminRoutes.put("/orders/:id", authenticateAdmin, updateOrderStatus);

// Drones
// adminRoutes.get("/drones", authenticateAdmin, getAllDrones);
// adminRoutes.post("/drones", authenticateAdmin, addDrone);
// adminRoutes.delete("/drones/:id", authenticateAdmin, deleteDrone);
// adminRoutes.put("/drones/:id", authenticateAdmin, updateDrone);

// Customers

adminRoutes.get("/users",  getAllUsers_Admin);
adminRoutes.put("/users/:id", updateUser_Admin);
adminRoutes.delete("/users/:id", deleteUser_Admin);

// Price Plans
// adminRoutes.post("/price-plans", authenticateAdmin, addPricePlan);
// adminRoutes.put("/price-plans/:id", authenticateAdmin, updatePricePlan);
// adminRoutes.delete("/price-plans/:id", authenticateAdmin, deletePricePlan);

export default adminRoutes;