"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const nanoid_1 = require("nanoid");
const nanoid = (0, nanoid_1.customAlphabet)('abcdefghijklmnopqrstuvwxyz0123456789', 6);
const peripheralSchema = new mongoose_1.default.Schema({
    gateway_id: { type: String, ref: 'Gateway' },
    uid: {
        type: String,
        required: true,
        unique: true,
        default: () => `PD_${nanoid()}`,
    },
    vendor: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['ONLINE', 'OFFLINE'],
        default: 'OFFLINE',
    },
}, {
    timestamps: true,
});
const PeripheralModel = mongoose_1.default.model('Peripheral', peripheralSchema);
exports.default = PeripheralModel;
