"use strict";
const mongoose = require('mongoose');
const DeliveryRequestSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    packageID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },
    deliveryLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "delivered"],
        required: true
    }
});
module.exports = mongoose.model('DeliveryRequest', DeliveryRequestSchema);
