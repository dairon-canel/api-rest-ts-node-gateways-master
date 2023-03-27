import { Express, Request, Response } from 'express';
import {
  createGatewayHandler,
  deleteGatewayHandler,
  getAllGatewayHandler,
  getGatewayHandler,
  updateGatewayHandler,
} from './controller/gateway.controller';
import {
  createPeripheralHandler,
  deletePeripheralHandler,
  getAllPeripheralByGatewayHandler,
  getAllPeripheralHandler,
  getPeripheralHandler,
  updatePeripheralHandler,
} from './controller/peripheral.controller';
import validateResource from './middleware/validateResource';
import {
  createGatewaySchema,
  deleteGatewaySchema,
  getGatewaySchema,
  updateGatewaySchema,
} from './schema/gateway.schema';
import {
  createPeripheralSchema,
  deletePeripheralSchema,
  getPeripheralSchema,
  updatePeripheralSchema,
} from './schema/peripheral.schema';

function routes(app: Express) {
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
  app.get('/healthcheck', (req: Request, res: Response) =>
    res.status(200).send({ serverStatus: 'Server is up and running' }),
  );

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
  app.post(
    '/api/gateways',
    validateResource(createGatewaySchema),
    createGatewayHandler,
  );

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
  app.put(
    '/api/gateways/:serialNumber',
    validateResource(updateGatewaySchema),
    updateGatewayHandler,
  );

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
  app.get(
    '/api/gateways/:serialNumber',
    validateResource(getGatewaySchema),
    getGatewayHandler,
  );

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
  app.get('/api/gateways', getAllGatewayHandler);

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
  app.delete(
    '/api/gateways/:serialNumber',
    validateResource(deleteGatewaySchema),
    deleteGatewayHandler,
  );

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
  app.post(
    '/api/peripherals/:serialNumber',
    validateResource(createPeripheralSchema),
    createPeripheralHandler,
  );

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
  app.put(
    '/api/peripherals/:uid',
    validateResource(updatePeripheralSchema),
    updatePeripheralHandler,
  );

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
  app.get(
    '/api/peripherals',
    validateResource(getPeripheralSchema),
    getAllPeripheralHandler,
  );

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
  app.get(
    '/api/peripherals/:uid',
    validateResource(getPeripheralSchema),
    getPeripheralHandler,
  );

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
  app.get(
    '/api/peripherals/:serialNumber/all',
    validateResource(getPeripheralSchema),
    getAllPeripheralByGatewayHandler,
  );

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
  app.delete(
    '/api/peripherals/:uid',
    validateResource(deletePeripheralSchema),
    deletePeripheralHandler,
  );
}

export default routes;
