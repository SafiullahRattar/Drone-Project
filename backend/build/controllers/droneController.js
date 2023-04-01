"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDroneById = exports.updateDrone = exports.deleteDrone = exports.addDrone = exports.getAllDrones = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const droneModel_1 = __importDefault(require("../models/droneModel"));
const getAllDrones = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const drones = yield droneModel_1.default.find({});
    res.status(200).json({ drones });
}));
exports.getAllDrones = getAllDrones;
const addDrone = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, status, currentLocation, batteryLevel, lastMaintenanceDate, weightCapacity, maxFlightDistance, deliveryRange, deliveryCapacity, speed, } = req.body;
    const newDrone = new droneModel_1.default({
        id,
        name,
        status,
        currentLocation,
        batteryLevel,
        lastMaintenanceDate: new Date(lastMaintenanceDate),
        weightCapacity,
        maxFlightDistance,
        deliveryRange,
        deliveryCapacity,
        speed,
    });
    const createdDrone = yield newDrone.save();
    res.status(201).json({ drone: createdDrone });
}));
exports.addDrone = addDrone;
const deleteDrone = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedDrone = yield droneModel_1.default.findByIdAndDelete(id);
    if (!deletedDrone) {
        res.status(404).json({ message: "Drone not found" });
        throw new Error("Drone not found");
    }
    res.status(200).json({ drone: deletedDrone });
}));
exports.deleteDrone = deleteDrone;
// @route   PUT api/admin/drones/:id
// @desc    Update a drone
// @access  Private (admin only)
const updateDrone = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, status, currentLocation, batteryLevel, lastMaintenanceDate, weightCapacity, maxFlightDistance, deliveryRange, deliveryCapacity, speed, } = req.body;
    const drone = yield droneModel_1.default.findById(id);
    if (drone) {
        drone.name = name || drone.name;
        drone.status = status || drone.status;
        drone.currentLocation = currentLocation || drone.currentLocation;
        drone.batteryLevel = batteryLevel || drone.batteryLevel;
        drone.lastMaintenanceDate =
            lastMaintenanceDate || drone.lastMaintenanceDate;
        drone.weightCapacity = weightCapacity || drone.weightCapacity;
        drone.maxFlightDistance = maxFlightDistance || drone.maxFlightDistance;
        drone.deliveryRange = deliveryRange || drone.deliveryRange;
        drone.deliveryCapacity = deliveryCapacity || drone.deliveryCapacity;
        drone.speed = speed || drone.speed;
        const updatedDrone = yield drone.save();
        res.status(200).json({ drone: updatedDrone });
    }
    else {
        res.status(404);
        throw new Error("Drone not found");
    }
}));
exports.updateDrone = updateDrone;
// @route   GET api/admin/drones/:id
// @desc    Get a single drone by ID
// @access  Private (admin only)
const getDroneById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const drone = yield droneModel_1.default.findById(id);
    if (drone) {
        res.json(drone);
    }
    else {
        res.status(404);
        throw new Error("Drone not found");
    }
}));
exports.getDroneById = getDroneById;
