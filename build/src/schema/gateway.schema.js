"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGatewaySchema = exports.deleteGatewaySchema = exports.updateGatewaySchema = exports.createGatewaySchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Name is required',
        }).min(3, 'Name should be at least 3 characters long'),
        ipv4Address: (0, zod_1.string)({
            required_error: 'Ip is required',
        }).ip({ version: 'v4', message: 'Invalid IPv4 address' }),
    }),
};
const updatePayload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Name is required',
        }).min(3, 'Name should be at least 3 characters long'),
        ipv4Address: (0, zod_1.string)()
            .ip({ version: 'v4', message: 'Invalid IPv4 address' })
            .optional(),
    }),
};
const params = {
    params: (0, zod_1.object)({
        serialNumber: (0, zod_1.string)({
            required_error: 'serialNumber is required',
        }),
    }),
};
exports.createGatewaySchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateGatewaySchema = (0, zod_1.object)(Object.assign(Object.assign({}, updatePayload), params));
exports.deleteGatewaySchema = (0, zod_1.object)(Object.assign({}, params));
exports.getGatewaySchema = (0, zod_1.object)(Object.assign({}, params));
