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
exports.getAllDeliveries = exports.updateDeliveryStatus_Admin = exports.updateDeliveryById = exports.getDeliveryById = exports.getDeliveryByUserId = exports.getDeliveryByStatus = exports.addDelivery = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const deliveryModel_1 = __importDefault(require("../models/deliveryModel"));
exports.addDelivery = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sender = req.body.user._id;
    const { package_id, receiver, date, priority, pickup_location, drop_location, } = req.body;
    try {
        const newDelivery = new deliveryModel_1.default({
            package_id,
            receiver,
            sender,
            date,
            priority,
            // drop_location,
            // pickup_location,
            status: "pending",
        });
        const delivery = yield newDelivery.save();
        res.json(delivery);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}));
exports.getDeliveryByStatus = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const delivery = yield deliveryModel_1.default.find({ status: req.params.status });
        res.json(delivery);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}));
exports.getDeliveryByUserId = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sender = req.body.user._id;
    try {
        const delivery = yield deliveryModel_1.default.find({ sender }).populate("package_id");
        res.json(delivery);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("PROBLEM IN FETCHING LIST");
    }
}));
exports.getDeliveryById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const delivery = yield deliveryModel_1.default.findById(req.params.id);
        res.json(delivery);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}));
exports.updateDeliveryById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { receiver, date, priority, price, status, distance } = req.body;
    //Build delivery object
    try {
        const delivery = yield deliveryModel_1.default.findById(req.params.id);
        if (!delivery) {
            res.status(404).json({ msg: "Delivery not found" });
        }
        else {
            delivery.receiver = receiver || delivery.receiver;
            delivery.date = date || delivery.date;
            delivery.priority = priority || delivery.priority;
            delivery.price = price || delivery.price;
            delivery.status = status || delivery.status;
            delivery.distance = distance || delivery.distance;
            const updatedDelivery = yield delivery.save();
            res.status(200).json({
                delivery: updatedDelivery,
            });
        }
    }
    catch (err) {
        res.status(500).send("Server Error");
    }
}));
/**
 * Update the status of an delivery by ID
 * @returns The updated delivery object as a JSON response, or a 404 error if the delivery is not found
 */
exports.updateDeliveryStatus_Admin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the delivery ID from the request parameters
        const id = req.params.id;
        // Get the new status from the request body
        const { status } = req.body;
        // Find the delivery by ID and update its status
        const updatedDelivery = yield deliveryModel_1.default.findByIdAndUpdate(id, { status }, { new: true });
        // If the delivery is not found, return a 404 error
        if (!updatedDelivery) {
            res.status(404).json({ error: "Delivery not found" });
            return;
        }
        // Return the updated delivery object as a JSON response
        res.json(updatedDelivery);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
/**
 * Get All the deliveries
 * @returns List of all the deliveries
 */
exports.getAllDeliveries = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get all the deliveries
        const deliveries = yield deliveryModel_1.default.find();
        // Return the list of deliveries as a JSON response
        res.json(deliveries);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
