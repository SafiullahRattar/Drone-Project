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
exports.getPaths = exports.addPath = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const pathModel_1 = __importDefault(require("../models/pathModel"));
exports.addPath = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const path_data = req.body;
    try {
        const savedPath = yield pathModel_1.default.create(path_data);
        res.status(201).json(savedPath);
    }
    catch (err) {
        res.status(400).json({ message: "" });
    }
}));
exports.getPaths = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // populate("delivery")  then populate("package_id")
        const paths = yield pathModel_1.default.find().populate("delivery").populate("package_id");
        res.json(paths);
    }
    catch (err) {
        res.status(500).json({ message: "" });
    }
}));
