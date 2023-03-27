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
exports.deleteGatewayHandler = exports.getAllGatewayHandler = exports.getGatewayHandler = exports.updateGatewayHandler = exports.createGatewayHandler = void 0;
const gateway_service_1 = require("../service/gateway.service");
const peripheral_service_1 = require("../service/peripheral.service");
const logger_1 = __importDefault(require("../utils/logger"));
function createGatewayHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const gateway = yield (0, gateway_service_1.createGateway)(body);
            return res.send(gateway);
        }
        catch (error) {
            logger_1.default.error('Error creating gateway:');
            logger_1.default.error(error.message);
            return res.status(500).send(error.message);
        }
    });
}
exports.createGatewayHandler = createGatewayHandler;
function updateGatewayHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const serialNumber = req.params.serialNumber;
            const update = req.body;
            if (!update || !serialNumber) {
                return res.status(403).json({ error: 'Invalid gateway data' });
            }
            const gateway = yield (0, gateway_service_1.findGateway)({ serialNumber });
            if (!gateway)
                return res.status(404).send({ error: 'Gateway not found' });
            const updatedGateway = yield (0, gateway_service_1.findAndUpdateGateway)({ serialNumber }, update, {
                new: true,
            });
            return res.send(updatedGateway);
        }
        catch (error) {
            logger_1.default.error('Error updating gateway:');
            logger_1.default.error(error.message);
            return res.status(500).json({
                error: 'Error updating gateway',
                message: error.message,
            });
        }
    });
}
exports.updateGatewayHandler = updateGatewayHandler;
function getGatewayHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const serialNumber = req.params.serialNumber;
            const gateway = yield (0, gateway_service_1.findGateway)({ serialNumber });
            if (!gateway)
                return res.status(404).send({ error: 'Gateway not found' });
            return res.send(gateway);
        }
        catch (error) {
            logger_1.default.error('Error retrieving gateway:');
            logger_1.default.error(error.message);
            return res.status(500).json({
                error: 'Error retrieving gateway',
                message: error.message,
            });
        }
    });
}
exports.getGatewayHandler = getGatewayHandler;
function getAllGatewayHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const gateways = yield (0, gateway_service_1.queryGateway)({}, {});
            if (!gateways)
                return res.status(404).send({ error: 'Gateway not found' });
            return res.send(gateways);
        }
        catch (error) {
            logger_1.default.error('Error retrieving gateways:');
            logger_1.default.error(error.message);
            return res.status(500).json({
                error: 'Error retrieving gateways',
                message: error.message,
            });
        }
    });
}
exports.getAllGatewayHandler = getAllGatewayHandler;
function deleteGatewayHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const serialNumber = req.params.serialNumber;
            const gateway = yield (0, gateway_service_1.findGateway)({ serialNumber });
            if (!gateway)
                return res.status(404).send({ error: 'Gateway not found' });
            yield (0, gateway_service_1.deleteGateway)({ serialNumber });
            if (gateway.peripheralCount && gateway.peripheralCount >= 1) {
                yield (0, peripheral_service_1.deletePeripheralsByGateway)({ gateway_id: serialNumber });
            }
            return res.send(gateway);
        }
        catch (error) {
            logger_1.default.error('Error deleting gateway:');
            logger_1.default.error(error.message);
            return res.status(500).json({
                error: 'Error deleting gateway',
                message: error.message,
            });
        }
    });
}
exports.deleteGatewayHandler = deleteGatewayHandler;
