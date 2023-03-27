import express from 'express';
import routes from '../routes';

function createServer() {
  const app = express();

  app.use(express.json());

  app.use(express.static('dist'));

  routes(app);

  return app;
}

export default createServer;
