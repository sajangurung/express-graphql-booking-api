import * as graphql from 'express-graphql';
import { rootResolver } from '../../server/graphql/resolvers';
import { rootSchema } from '../../server/graphql/schema';

const graphqlApi = graphql({
  schema: rootSchema,
  rootValue: rootResolver,
  graphiql: true,
});

export default graphqlApi;
