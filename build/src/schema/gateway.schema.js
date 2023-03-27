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
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateGatewayInput:
 *      type: object
 *      required:
 *        - name
 *        - ipv4Address
 *      properties:
 *        name:
 *          type: string
 *          default: GW001
 *        ipv4Address:
 *          type: string
 *          default: 197.168.0.1
 *    UpdateGatewayInput:
 *      type: object
 *      required:
 *        - name
 *      optional:
 *        - ipv4Address
 *      properties:
 *        name:
 *          type: string
 *          default: GW001
 *        ipv4Address:
 *          type: string
 *          default: 197.168.0.1
 *    GatewaySchema:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        ipv4Address:
 *          type: string
 *        peripheralCount:
 *          type: number
 *        serialNumber:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
exports.createGatewaySchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateGatewaySchema = (0, zod_1.object)(Object.assign(Object.assign({}, updatePayload), params));
exports.deleteGatewaySchema = (0, zod_1.object)(Object.assign({}, params));
exports.getGatewaySchema = (0, zod_1.object)(Object.assign({}, params));
