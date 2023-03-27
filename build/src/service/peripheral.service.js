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
exports.deletePeripheralsByGateway = exports.deletePeripheral = exports.findAndUpdatePeripheral = exports.queryPeripheral = exports.findPeripheral = exports.createPeripheral = void 0;
const peripheral_model_1 = __importDefault(require("../models/peripheral.model"));
function createPeripheral(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return peripheral_model_1.default.create(input);
    });
}
exports.createPeripheral = createPeripheral;
function findPeripheral(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        return peripheral_model_1.default.findOne(query, {}, options);
    });
}
exports.findPeripheral = findPeripheral;
function queryPeripheral(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        return peripheral_model_1.default.find(query, {}, options);
    });
}
exports.queryPeripheral = queryPeripheral;
function findAndUpdatePeripheral(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return peripheral_model_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.findAndUpdatePeripheral = findAndUpdatePeripheral;
function deletePeripheral(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return peripheral_model_1.default.deleteOne(query);
    });
}
exports.deletePeripheral = deletePeripheral;
function deletePeripheralsByGateway(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return peripheral_model_1.default.deleteMany(query);
    });
}
exports.deletePeripheralsByGateway = deletePeripheralsByGateway;
