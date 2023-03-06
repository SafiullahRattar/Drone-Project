"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const droneSchema = new mongoose_1.default.Schema({
    droneId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    status: {
        type: String,
        enum: ["available", "in use", "maintenance"],
        required: true,
    },
    currentLocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    batteryLevel: { type: Number, required: true },
    lastMaintenanceDate: { type: Date, required: true },
});
const Drone = mongoose_1.default.model("Drone", droneSchema);
exports.default = Drone;
