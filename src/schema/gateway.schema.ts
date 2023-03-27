import { object, string, TypeOf } from 'zod';

const payload = {
  body: object({
    name: string({
      required_error: 'Name is required',
    }).min(3, 'Name should be at least 3 characters long'),
    ipv4Address: string({
      required_error: 'Ip is required',
    }).ip({ version: 'v4', message: 'Invalid IPv4 address' }),
  }),
};

const updatePayload = {
  body: object({
    name: string({
      required_error: 'Name is required',
    }).min(3, 'Name should be at least 3 characters long'),
    ipv4Address: string()
      .ip({ version: 'v4', message: 'Invalid IPv4 address' })
      .optional(),
  }),
};

const params = {
  params: object({
    serialNumber: string({
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

export const createGatewaySchema = object({
  ...payload,
});

export const updateGatewaySchema = object({
  ...updatePayload,
  ...params,
});

export const deleteGatewaySchema = object({
  ...params,
});

export const getGatewaySchema = object({
  ...params,
});

export type CreateGatewayInput = TypeOf<typeof createGatewaySchema>;
export type UpdateGatewayInput = TypeOf<typeof updateGatewaySchema>;
export type ReadGatewayInput = TypeOf<typeof getGatewaySchema>;
export type DeleteGatewayInput = TypeOf<typeof deleteGatewaySchema>;
