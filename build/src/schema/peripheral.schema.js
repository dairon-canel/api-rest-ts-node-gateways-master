"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPeripheralSchema = exports.deletePeripheralSchema = exports.updatePeripheralSchema = exports.createPeripheralSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        gateway_id: (0, zod_1.string)({
            required_error: 'Gateway id is required',
        })
            .length(9, 'Gateway id must be 9 characters long')
            .startsWith('GW_', "Gateway id must start with 'GL_'"),
        vendor: (0, zod_1.string)({
            required_error: 'Vendor is required',
        }).min(3, 'Vendor should be at least 3 characters long'),
        status: (0, zod_1.nativeEnum)({ online: 'ONLINE', offline: 'OFFLINE' }),
    }),
};
const updatePayload = {
    body: (0, zod_1.object)({
        vendor: (0, zod_1.string)({
            required_error: 'Vendor is required',
        }).min(3, 'Vendor should be at least 3 characters long'),
        status: (0, zod_1.nativeEnum)({ online: 'ONLINE', offline: 'OFFLINE' }),
    }),
};
const params = {
    params: (0, zod_1.object)({
        uid: (0, zod_1.string)()
            .optional()
            .transform(e => (e === '' ? undefined : e)),
        serialNumber: (0, zod_1.string)()
            .optional()
            .transform(e => (e === '' ? undefined : e)),
    }),
};
exports.createPeripheralSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updatePeripheralSchema = (0, zod_1.object)(Object.assign(Object.assign({}, updatePayload), params));
exports.deletePeripheralSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getPeripheralSchema = (0, zod_1.object)(Object.assign({}, params));
