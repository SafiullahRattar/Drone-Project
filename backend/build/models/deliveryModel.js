"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const addressModel_1 = __importDefault(require("./addressModel"));
const userModel_1 = __importDefault(require("./userModel"));
const deliverySchema = new mongoose_1.default.Schema({
    sender: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: userModel_1.default,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "delivered"],
        required: true,
    },
    pickup_location: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: addressModel_1.default,
        required: true,
    },
    drop_location: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: addressModel_1.default,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
});
const Delivery = mongoose_1.default.model("Delivery", deliverySchema);
exports.default = Delivery;
