# API REST Service with Node for Managing Gateways and Peripheral Devices

This project is a sample API REST service built with Node.js that manages gateways - master devices that control multiple peripheral devices. The service allows users to store information about these gateways and their associated devices, which is stored in a database.

## Table of contents

- [API REST Service with Node for Managing Gateways and Peripheral Devices](#api-rest-service-with-node-for-managing-gateways-and-peripheral-devices)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshots](#screenshots)
      - [Frontend](#frontend)
      - [Swagger Docs](#swagger-docs)
    - [Links](#links)
  - [Development environment](#development-environment)
    - [Requeriments used](#requeriments-used)
    - [Installing Dependencies](#installing-dependencies)
  - [Author](#author)
  - [Contributing](#contributing)
  - [License](#license)

## Overview

### The challenge

The problem this project solves is the need for a system to manage gateways and their associated peripheral devices. The system ensures that any field marked as "to be validated" is validated and an error is returned if it is invalid. Additionally, the system ensures that no more than 10 peripheral devices are allowed for a gateway. The system offers an operation for displaying information about all stored gateways (and their devices) and an operation for displaying details for a single gateway. Finally, it allows users to add and remove a device from a gateway.

### Screenshots

#### Frontend

![](./screenshot.jpg)

#### Swagger Docs

![](./screenshot.jpg)

### Links

- You can access the live site for this API REST service at: [https://api-rest-ts-node-gateways](https://api-rest-ts-node-gateways-master-production.up.railway.app/)
- You can access the API documentation for this service at: [https://api-rest-ts-node-gateways/docs](https://api-rest-ts-node-gateways-master-production.up.railway.app/docs)
- Swagger json for import to postman: [https://api-rest-ts-node-gateways/docs.json](https://api-rest-ts-node-gateways-master-production.up.railway.app/docs.json)
- Frontend app repository: [https://github.com/dairon-canel/gateway-list-app](https://github.com/dairon-canel/gateway-list-app)

## Development environment

### Requeriments used

- The version of Node.js used for this project is v14.21.0.
- Used windows 11 for development

### Installing Dependencies

To install the project, use the following command:

```bash
yarn
```

add a .env file with this format:

```javascript
PORT = 1337;
DB_CONNECTION_DEV = 'mongodb://localhost:27017/rest-api-gateway';
DB_CONNECTION_PROD = '';
NODE_ENV = prod;
```

For run the development environment, use:

```bash
yarn dev
```

For run a production environment, use:

```bash
yarn build
```

and then:

```bash
yarn start
```

## Author

- LinkedIn - [@dairon-canel](https://www.linkedin.com/in/dairon-canel)
- Frontend Mentor - [@dairon-canel](https://www.frontendmentor.io/profile/RyuzakCoder)
- Github - [@dairon-canel](https://github.com/dairon-canel)

## Contributing

Contributions to this project are welcome. To contribute, please fork this repository, create a new branch, and submit a pull request. Please ensure that your code adheres to the JavaScript Standard Style guidelines.

## License

This project is licensed under the MIT License.
