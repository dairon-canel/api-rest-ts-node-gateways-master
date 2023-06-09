import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
import createServer from './utils/server';
import swaggerDocs from './utils/swagger';

const port = config.get<number>('port');

const app = createServer();

app.listen(1337, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();

  swaggerDocs(app, port);
});
