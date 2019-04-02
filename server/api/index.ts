import * as express from 'express';

import logger from '../logs';

import eventApi from './event';
import userApi from './user';

function handleError(err, _, res, __) {
  logger.error(err.stack);

  res.json({ error: err.message || err.toString() });
}

export default function api(server: express.Express) {
  server.use('/api/v1/users', userApi, handleError);
  server.use('/api/v1/events', eventApi, handleError);
}
