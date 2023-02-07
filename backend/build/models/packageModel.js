"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const packageSchema = new mongoose.Schema({
    weight: {
        type: Number,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
});
const Package = mongoose.model("Package", packageSchema);
exports.default = Package;
