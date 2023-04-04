"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deliveryController_1 = require("../controllers/deliveryController");
const droneController_1 = require("../controllers/droneController");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const adminRoutes = express_1.default.Router();
// Apply admin middleware to all routes in this router
adminRoutes.use(authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware);
// DELIVERY
// Update the status of an Delivery by ID
adminRoutes.put("/orders/:id/status", deliveryController_1.updateDeliveryStatus_Admin);
//Get all the deliveries
adminRoutes.get("/orders", deliveryController_1.getAllDeliveries);
adminRoutes
    .route("/orders/:id")
    .put(authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, deliveryController_1.updateDeliveryById);
// Drones
adminRoutes.get("/drones/:id", droneController_1.getDroneById);
adminRoutes.get("/drones", droneController_1.getAllDrones);
adminRoutes.post("/drones", droneController_1.addDrone);
adminRoutes.delete("/drones/:id", droneController_1.deleteDrone);
adminRoutes.put("/drones/:id", droneController_1.updateDrone);
// Customers
adminRoutes.get("/users", userController_1.getAllUsers_Admin);
adminRoutes.put("/users/:id", userController_1.updateUser_Admin);
adminRoutes.delete("/users/:id", userController_1.deleteUser_Admin);
// Price Plans
// adminRoutes.post("/price-plans", authenticateAdmin, addPricePlan);
// adminRoutes.put("/price-plans/:id", authenticateAdmin, updatePricePlan);
// adminRoutes.delete("/price-plans/:id", authenticateAdmin, deletePricePlan);
exports.default = adminRoutes;
