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
const express_1 = __importDefault(require("express"));
const priceModel_1 = __importDefault(require("../models/priceModel"));
const router = express_1.default.Router();
// Create a new price plan
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price } = req.body;
        const pricePlan = new priceModel_1.default({
            name,
            description,
            price,
        });
        yield pricePlan.save();
        res.status(201).send(pricePlan);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}));
// Get all price plans
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pricePlans = yield priceModel_1.default.find();
        res.status(200).send(pricePlans);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}));
// Update a price plan
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price } = req.body;
        const { id } = req.params;
        const pricePlan = yield priceModel_1.default.findByIdAndUpdate(id, { name, description, price }, { new: true });
        if (!pricePlan) {
            return res.status(404).send('Price plan not found');
        }
        res.status(200).send(pricePlan);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}));
// Delete a price plan
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const pricePlan = yield priceModel_1.default.findByIdAndDelete(id);
        if (!pricePlan) {
            return res.status(404).send('Price plan not found');
        }
        res.status(200).send(pricePlan);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}));
exports.default = router;
