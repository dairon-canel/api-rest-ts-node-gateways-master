"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const nanoid_1 = require("nanoid");
const nanoid = (0, nanoid_1.customAlphabet)('abcdefghijklmnopqrstuvwxyz0123456789', 6);
const gatewaySchema = new mongoose_1.default.Schema({
    serialNumber: {
        type: String,
        required: true,
        unique: true,
        default: () => `GW_${nanoid()}`,
    },
    name: {
        type: String,
        required: true,
        maxlength: 50,
        match: /^[a-zA-Z0-9\s]*$/,
    },
    ipv4Address: {
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                return /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.)){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(v);
            },
            message: 'Invalid IPv4 address',
        },
    },
    peripheralCount: {
        type: Number,
        required: true,
        default: 0,
    },
}, {
    timestamps: true,
});
const GatewayModel = mongoose_1.default.model('Gateway', gatewaySchema);
exports.default = GatewayModel;
