import * as express from 'express';

import logger from '../logs';

import eventApi from './event';
import graphqlApi from './graphql';
import userApi from './user';

const handleError = (err, _, res, __) => {
  logger.error(err.stack);

  res.json({ error: err.message || err.toString() });
};

export default function api(server: express.Express, passport) {

  // Rest routes
  server.use('/api/v1/users', passport.authenticate('jwt', { session: false }), userApi, handleError);
  server.use('/api/v1/events', eventApi, handleError);

  // Graphql
  server.use('/graphql', graphqlApi, handleError);
}
