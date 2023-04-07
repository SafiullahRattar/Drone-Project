"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const pathModel = new mongoose_1.default.Schema({
    delivery_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Delivery",
    },
    location: {
        type: [Number],
        required: true,
    },
    weight: Number,
    quantity: Number,
    priority: Number,
    time: Number,
});
const pathSchema = new mongoose_1.default.Schema({
    path: {
        type: [pathModel],
    },
});
const Path = mongoose_1.default.model("Path", pathSchema);
exports.default = Path;
