"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const packageModel_1 = __importDefault(require("./packageModel"));
const userModel_1 = __importDefault(require("./userModel"));
const deliverySchema = new mongoose_1.default.Schema({
    sender: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: userModel_1.default,
        required: true,
    },
    package_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: packageModel_1.default,
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
        default: 0
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "delivered"],
        required: true,
    },
    // pickup_location: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: Address,
    //   required: true,
    // },
    // drop_location: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: Address,
    //   required: true,
    // },
    distance: {
        type: Number,
        default: 0
    },
});
const Delivery = mongoose_1.default.model("Delivery", deliverySchema);
exports.default = Delivery;
