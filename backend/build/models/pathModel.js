"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const pathModel = new mongoose_1.default.Schema({
    delivery: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Delivery",
    },
    time_elapsed: {
        type: Number,
        required: true,
    },
    battery_level: {
        type: Number,
        required: true,
    },
    drone: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Drone",
        // required: true,
    },
    is_home: {
        type: Boolean,
        required: true,
    },
    // {x,y,z}
    coordinates: {
        type: [Number],
        required: true,
    },
});
const pathSchema = new mongoose_1.default.Schema({
    path: {
        type: [pathModel],
    },
});
const Path = mongoose_1.default.model("Path", pathSchema);
exports.default = Path;
