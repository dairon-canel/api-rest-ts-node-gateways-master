import express from 'express';
import routes from '../routes';
import cors from 'cors';

function createServer() {
  const app = express();

  app.use(express.json());

  const allowedOrigins = ['https://gateway-list-app.vercel.app/'];

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg =
            'The CORS policy for this site does not allow access from the specified Origin.';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
    }),
  );

  routes(app);

  return app;
}

export default createServer;
