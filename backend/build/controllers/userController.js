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
exports.deleteUser_Admin = exports.updateUser_Admin = exports.getAllUsers_Admin = exports.getUserProfile = exports.authUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const generateToken_1 = require("../utils/generateToken");
exports.authUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, name } = (_a = req.user) === null || _a === void 0 ? void 0 : _a._json;
    let user;
    user = yield userModel_1.default.findOne({ email }).select("-password");
    if (!user) {
        console.log("ADDING NEW USER");
        user = yield userModel_1.default.create({
            name,
            email,
            isAdmin: false,
        });
    }
    const jwt = (0, generateToken_1.generateToken)(user._id);
    // console.log(req.user);
    res.cookie("JWT", jwt);
    res.redirect(process.env.CLIENT_URL);
}));
exports.getUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send('Success')
    const user = yield userModel_1.default.findById(req.body.user._id);
    // console.log('made it');
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
}));
/**
 * @desc   Fetch all users
 * @route  GET /api/admin/users
 * @access Private/Admin
 */
exports.getAllUsers_Admin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.default.find({});
    res.json(users);
}));
/**
 * @desc   Update user
 * @route  PUT /api/admin/users/:id
 * @access Private/Admin
 */
exports.updateUser_Admin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin;
        const updatedUser = yield user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
}));
/**
 * @desc   Delete user
 * @route  DELETE /api/admin/users/:id
 * @access Private/Admin
 */
exports.deleteUser_Admin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.params.id);
    if (user) {
        yield user.remove();
        res.json({ message: "User removed" });
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
}));
