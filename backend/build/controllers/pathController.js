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
    // const path_data = req.body.slice(0, req.body.length - 2);
    delete req.body.user;
    // every from req.body except req.body.user [{}, {}, {}, user: {}]
    const path_data = req.body;
    try {
        // path_data without path_data.user
        const savedPath = new pathModel_1.default({ path: path_data });
        yield savedPath.save();
        res.status(201).json(savedPath);
    }
    catch (err) {
        res.status(400).json({ message: "" });
    }
}));
exports.getPaths = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Path : {type: [PathModel]}
        // PathModel : {delivery: {type: mongoose.Schema.Types.ObjectId, ref: "Delivery"}, is_home: {type: Boolean, required: true}, }
        // populate("path.delivery") from delivery  populate delivery.package_id
        // const paths = await Path.find().populate("path.delivery").populate("path.drone");
        const paths = yield pathModel_1.default.find().populate({
            path: "path.delivery",
            populate: {
                path: "package_id",
                model: "Package",
            },
        }).populate('path.drone');
        console.log(paths);
        res.json(paths);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
