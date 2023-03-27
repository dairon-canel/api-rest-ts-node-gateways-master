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
    /**
     * @openapi
     * /healthcheck:
     *  get:
     *     tags:
     *     - Healthcheck
     *     description: Responds if the app is up and running
     *     responses:
     *       200:
     *         description: App is up and running
     */
    app.get('/healthcheck', (req, res) => res.status(200).send({ serverStatus: 'Server is up and running' }));
    /**
     * @openapi
     * '/api/gateways':
     *  post:
     *     tags:
     *     - Gateways
     *     summary: Creates a gateway
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/CreateGatewayInput'
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/GatewaySchema'
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     */
    app.post('/api/gateways', (0, validateResource_1.default)(gateway_schema_1.createGatewaySchema), gateway_controller_1.createGatewayHandler);
    /**
     * @openapi
     * '/api/gateways/{serialNumber}':
     *  put:
     *     tags:
     *     - Gateways
     *     summary: Updates a gateway given a serial number
     *     parameters:
     *      - name: serialNumber
     *        in: path
     *        description: The serial number of the gateway
     *        required: true
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/UpdateGatewayInput'
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/GatewaySchema'
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     */
    app.put('/api/gateways/:serialNumber', (0, validateResource_1.default)(gateway_schema_1.updateGatewaySchema), gateway_controller_1.updateGatewayHandler);
    /**
     * @openapi
     * '/api/gateways/{serialNumber}':
     *  get:
     *     tags:
     *     - Gateways
     *     summary: Gets a gateway given a serial number
     *     parameters:
     *      - name: serialNumber
     *        in: path
     *        description: The serial number of the gateway
     *        required: true
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/GatewaySchema'
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     */
    app.get('/api/gateways/:serialNumber', (0, validateResource_1.default)(gateway_schema_1.getGatewaySchema), gateway_controller_1.getGatewayHandler);
    /**
     * @openapi
     * '/api/gateways':
     *  get:
     *     tags:
     *     - Gateways
     *     summary: Gets a list of all gateways
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                allOf:
     *                  - $ref: '#/components/schemas/GatewaySchema'
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     */
    app.get('/api/gateways', gateway_controller_1.getAllGatewayHandler);
    /**
     * @openapi
     * '/api/gateways/{serialNumber}':
     *  delete:
     *     tags:
     *     - Gateways
     *     summary: Deletes a gateway given a serial number
     *     parameters:
     *      - name: serialNumber
     *        in: path
     *        description: The serial number of the gateway
     *        required: true
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/GatewaySchema'
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     */
    app.delete('/api/gateways/:serialNumber', (0, validateResource_1.default)(gateway_schema_1.deleteGatewaySchema), gateway_controller_1.deleteGatewayHandler);
    /**
     * @openapi
     * '/api/peripherals/{serialNumber}':
     *  post:
     *     tags:
     *     - Peripheral Devices
     *     summary: Creates a peripheral device given a gateway serial number
     *     parameters:
     *      - name: serialNumber
     *        in: path
     *        description: The serial number of the gateway
     *        required: true
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/CreatePeripheralInput'
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/PeripheralSchema'
     *      401:
     *        description: No more than 10 peripheral devices are allowed for a gateway.
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     */
    app.post('/api/peripherals/:serialNumber', (0, validateResource_1.default)(peripheral_schema_1.createPeripheralSchema), peripheral_controller_1.createPeripheralHandler);
    /**
     * @openapi
     * '/api/peripherals/{uid}':
     *  put:
     *     tags:
     *     - Peripheral Devices
     *     summary: Updates a peripheral device given a unique identifier
     *     parameters:
     *      - name: uid
     *        in: path
     *        description: The unique identifier of the peripheral device
     *        required: true
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/UpdatePeripheralInput'
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/PeripheralSchema'
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     */
    app.put('/api/peripherals/:uid', (0, validateResource_1.default)(peripheral_schema_1.updatePeripheralSchema), peripheral_controller_1.updatePeripheralHandler);
    /**
     * @openapi
     * '/api/peripherals':
     *  get:
     *     tags:
     *     - Peripheral Devices
     *     summary: Gets a list of all peripheral devices
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                allOf:
     *                  - $ref: '#/components/schemas/PeripheralSchema'
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     */
    app.get('/api/peripherals', (0, validateResource_1.default)(peripheral_schema_1.getPeripheralSchema), peripheral_controller_1.getAllPeripheralHandler);
    /**
     * @openapi
     * '/api/peripherals/{uid}':
     *  get:
     *     tags:
     *     - Peripheral Devices
     *     summary: Gets a peripheral device given a unique identifier
     *     parameters:
     *      - name: uid
     *        in: path
     *        description: The unique identifier of the peripheral device
     *        required: true
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/PeripheralSchema'
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     */
    app.get('/api/peripherals/:uid', (0, validateResource_1.default)(peripheral_schema_1.getPeripheralSchema), peripheral_controller_1.getPeripheralHandler);
    /**
     * @openapi
     * '/api/peripherals/{serialNumber}/all':
     *  get:
     *     tags:
     *     - Peripheral Devices
     *     summary: Gets a list of all peripheral devices related to a given gateway serial number
     *     parameters:
     *      - name: serialNumber
     *        in: path
     *        description: The serial number of the gateway
     *        required: true
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                allOf:
     *                  - $ref: '#/components/schemas/PeripheralSchema'
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     */
    app.get('/api/peripherals/:serialNumber/all', (0, validateResource_1.default)(peripheral_schema_1.getPeripheralSchema), peripheral_controller_1.getAllPeripheralByGatewayHandler);
    /**
     * @openapi
     * '/api/peripherals/{uid}':
     *  delete:
     *     tags:
     *     - Peripheral Devices
     *     summary: Deletes a peripheral device given a unique identifier
     *     parameters:
     *      - name: uid
     *        in: path
     *        description: The unique identifier of the peripheral device
     *        required: true
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/GatewaySchema'
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     */
    app.delete('/api/peripherals/:uid', (0, validateResource_1.default)(peripheral_schema_1.deletePeripheralSchema), peripheral_controller_1.deletePeripheralHandler);
}
exports.default = routes;
