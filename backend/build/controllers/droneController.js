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
    const { name, status, currentLocation, batteryLevel, lastMaintenanceDate } = req.body;
    const newDrone = new droneModel_1.default({
        name,
        status,
        currentLocation,
        batteryLevel,
        lastMaintenanceDate,
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
const updateDrone = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, status, currentLocation, batteryLevel, lastMaintenanceDate } = req.body;
    const drone = yield droneModel_1.default.findById(id);
    if (!drone) {
        res.status(404).json({ message: "Drone not found" });
        throw new Error("Drone not found");
    }
    drone.name = name !== null && name !== void 0 ? name : drone.name;
    drone.batteryLevel = batteryLevel !== null && batteryLevel !== void 0 ? batteryLevel : drone.batteryLevel;
    drone.currentLocation = currentLocation !== null && currentLocation !== void 0 ? currentLocation : drone.currentLocation;
    drone.lastMaintenanceDate = lastMaintenanceDate !== null && lastMaintenanceDate !== void 0 ? lastMaintenanceDate : drone.lastMaintenanceDate;
    drone.status = status !== null && status !== void 0 ? status : drone.status;
    const updatedDrone = yield drone.save();
    res.status(200).json({ drone: updatedDrone });
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
