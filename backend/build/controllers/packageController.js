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
exports.updatePackageById = exports.getPackageById = exports.addPackage = exports.getPackages = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const packageModel_1 = __importDefault(require("../models/packageModel"));
exports.getPackages = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const packages = yield packageModel_1.default.find();
        res.json(packages);
    }
    catch (err) {
        res.status(500).json({ message: "" });
    }
}));
exports.addPackage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const package_data = req.body;
    try {
        const savedPackage = yield packageModel_1.default.create(package_data);
        res.status(201).json(savedPackage);
    }
    catch (err) {
        res.status(400).json({ message: "" });
    }
}));
exports.getPackageById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const package_data = yield packageModel_1.default.findById(req.params.id);
        res.json(package_data);
    }
    catch (err) {
        res.status(500).json({ message: "" });
    }
}));
exports.updatePackageById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPackage = yield packageModel_1.default.findByIdAndUpdate(req.params.id, req.body);
        res.json(updatedPackage);
    }
    catch (err) {
        res.status(500).json({ message: "" });
    }
}));
