"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AdressSchema = new mongoose_1.default.Schema({
    street: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
    },
    zip: {
        type: String,
    },
    latitude: {
        type: Number,
        required: true,
    },
    logitude: {
        type: Number,
        required: true,
    },
});
const Address = mongoose_1.default.model("Address", AdressSchema);
exports.default = Address;
