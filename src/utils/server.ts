import express from 'express';
import routes from '../routes';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

function createServer() {
  const app = express();

  app.use(express.json());

  app.use(cors());
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://gateway-list-app.vercel.app/',
      changeOrigin: true,
      secure: false,
      onProxyRes: function (proxyRes: any, req: any, res: any) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      },
    }),
  );

  routes(app);

  return app;
}

export default createServer;
