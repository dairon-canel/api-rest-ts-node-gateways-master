"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gateway_controller_1 = require("./controller/gateway.controller");
const peripheral_controller_1 = require("./controller/peripheral.controller");
const validateResource_1 = __importDefault(require("./middleware/validateResource"));
const gateway_schema_1 = require("./schema/gateway.schema");
const peripheral_schema_1 = require("./schema/peripheral.schema");
function routes(app) {
    app.get('/api/healthcheck', (req, res) => res.sendStatus(200));
    app.post('/api/gateways', (0, validateResource_1.default)(gateway_schema_1.createGatewaySchema), gateway_controller_1.createGatewayHandler);
    app.put('/api/gateways/:serialNumber', (0, validateResource_1.default)(gateway_schema_1.updateGatewaySchema), gateway_controller_1.updateGatewayHandler);
    app.get('/api/gateways/:serialNumber', (0, validateResource_1.default)(gateway_schema_1.getGatewaySchema), gateway_controller_1.getGatewayHandler);
    app.get('/api/gateways', gateway_controller_1.getAllGatewayHandler);
    app.delete('/api/gateways/:serialNumber', (0, validateResource_1.default)(gateway_schema_1.deleteGatewaySchema), gateway_controller_1.deleteGatewayHandler);
    app.post('/api/peripherals/:serialNumber', (0, validateResource_1.default)(peripheral_schema_1.createPeripheralSchema), peripheral_controller_1.createPeripheralHandler);
    app.put('/api/peripherals/:uid', (0, validateResource_1.default)(peripheral_schema_1.updatePeripheralSchema), peripheral_controller_1.updatePeripheralHandler);
    app.get('/api/peripherals', (0, validateResource_1.default)(peripheral_schema_1.getPeripheralSchema), peripheral_controller_1.getAllPeripheralHandler);
    app.get('/api/peripherals/:uid', (0, validateResource_1.default)(peripheral_schema_1.getPeripheralSchema), peripheral_controller_1.getPeripheralHandler);
    app.get('/api/peripherals/:serialNumber/all', (0, validateResource_1.default)(peripheral_schema_1.getPeripheralSchema), peripheral_controller_1.getAllPeripheralByGatewayHandler);
    app.delete('/api/peripherals/:uid', (0, validateResource_1.default)(peripheral_schema_1.deletePeripheralSchema), peripheral_controller_1.deletePeripheralHandler);
}
exports.default = routes;
