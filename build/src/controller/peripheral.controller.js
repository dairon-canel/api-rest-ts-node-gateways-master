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
exports.deletePeripheralHandler = exports.getAllPeripheralByGatewayHandler = exports.getAllPeripheralHandler = exports.getPeripheralHandler = exports.updatePeripheralHandler = exports.createPeripheralHandler = void 0;
const gateway_service_1 = require("../service/gateway.service");
const peripheral_service_1 = require("../service/peripheral.service");
const logger_1 = __importDefault(require("../utils/logger"));
function createPeripheralHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const { length } = yield (0, peripheral_service_1.queryPeripheral)({ gateway_id: body.gateway_id });
            if (length >= 10) {
                return res.status(400).send({
                    error: 'No more than 10 peripheral devices are allowed for a gateway.',
                });
            }
            const gateway = yield (0, gateway_service_1.findGateway)({ serialNumber: body.gateway_id });
            if (!gateway)
                return res.status(404).send({ error: 'Gateway not found' });
            const peripheral = yield (0, peripheral_service_1.createPeripheral)(body);
            yield (0, gateway_service_1.findAndUpdateGateway)({ serialNumber: body.gateway_id }, { peripheralCount: length + 1 }, {
                new: true,
            });
            return res.send(peripheral);
        }
        catch (error) {
            logger_1.default.error('Error creating peripheral:');
            logger_1.default.error(error.message);
            return res.status(500).json({
                error: 'Error creating peripheral',
                message: error.message,
            });
        }
    });
}
exports.createPeripheralHandler = createPeripheralHandler;
function updatePeripheralHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uid = req.params.uid;
            const update = req.body;
            const peripheral = yield (0, peripheral_service_1.findPeripheral)({ uid });
            if (!peripheral)
                return res.sendStatus(403);
            const updatedPeripheral = yield (0, peripheral_service_1.findAndUpdatePeripheral)({ uid }, update, {
                new: true,
            });
            return res.send(updatedPeripheral);
        }
        catch (error) {
            logger_1.default.error('Error updating peripheral:');
            logger_1.default.error(error.message);
            return res.status(500).json({
                error: 'Error updating peripheral',
                message: error.message,
            });
        }
    });
}
exports.updatePeripheralHandler = updatePeripheralHandler;
function getPeripheralHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uid = req.params.uid;
            const peripheral = yield (0, peripheral_service_1.findPeripheral)({ uid });
            if (!peripheral)
                return res.sendStatus(404);
            return res.send(peripheral);
        }
        catch (error) {
            logger_1.default.error('Error retrieving peripheral:');
            logger_1.default.error(error.message);
            return res.status(500).json({
                error: 'Error retrieving peripheral',
                message: error.message,
            });
        }
    });
}
exports.getPeripheralHandler = getPeripheralHandler;
function getAllPeripheralHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const peripherals = yield (0, peripheral_service_1.queryPeripheral)({});
            if (!peripherals)
                return res.sendStatus(404);
            return res.send(peripherals);
        }
        catch (error) {
            logger_1.default.error('Error retrieving peripherals:');
            logger_1.default.error(error.message);
            return res.status(500).json({
                error: 'Error retrieving peripherals',
                message: error.message,
            });
        }
    });
}
exports.getAllPeripheralHandler = getAllPeripheralHandler;
function getAllPeripheralByGatewayHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const serialNumber = req.params.serialNumber;
            const peripherals = yield (0, peripheral_service_1.queryPeripheral)({ gateway_id: serialNumber });
            if (!peripherals)
                return res.sendStatus(404);
            return res.send(peripherals);
        }
        catch (error) {
            logger_1.default.error('Error retrieving peripherals:');
            logger_1.default.error(error.message);
            return res.status(500).json({
                error: 'Error retrieving peripherals',
                message: error.message,
            });
        }
    });
}
exports.getAllPeripheralByGatewayHandler = getAllPeripheralByGatewayHandler;
function deletePeripheralHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uid = req.params.uid;
            const peripheral = yield (0, peripheral_service_1.findPeripheral)({ uid });
            if (!peripheral)
                return res.sendStatus(404);
            const { length } = yield (0, peripheral_service_1.queryPeripheral)({
                gateway_id: peripheral.gateway_id,
            });
            if (length < 1)
                return res.sendStatus(404);
            yield (0, peripheral_service_1.deletePeripheral)({ uid });
            yield (0, gateway_service_1.findAndUpdateGateway)({ serialNumber: peripheral.gateway_id }, { peripheralCount: length - 1 }, {
                new: true,
            });
            return res.send(peripheral);
        }
        catch (error) {
            logger_1.default.error('Error deleting peripheral:');
            logger_1.default.error(error.message);
            return res.status(500).json({
                error: 'Error deleting peripheral',
                message: error.message,
            });
        }
    });
}
exports.deletePeripheralHandler = deletePeripheralHandler;
