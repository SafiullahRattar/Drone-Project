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
exports.updateDeliveryById = exports.getDeliveryById = exports.getDeliveryByStatus = exports.addDelivery = void 0;
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
    const { name, status, phone, address } = req.body;
    //Build delivery object
    const deliveryFields = {};
    if (name)
        deliveryFields.name = name;
    if (status)
        deliveryFields.status = status;
    if (phone)
        deliveryFields.phone = phone;
    if (address)
        deliveryFields.address = address;
    try {
        let delivery = yield deliveryModel_1.default.findById(req.params.id);
        if (!delivery)
            res.status(404).json({ msg: "Delivery not found" });
        delivery = yield deliveryModel_1.default.findByIdAndUpdate(req.params.id, { $set: deliveryFields }, { new: true });
        res.json(delivery);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}));
