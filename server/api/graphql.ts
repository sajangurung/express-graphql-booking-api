import * as graphql from 'express-graphql';
import { buildSchema } from 'graphql';

const graphqlApi = graphql({
  schema: buildSchema(`
    type RootQuery {
      events: [String!]!
    }

    type RootMutation {
      createEvent(name: String): String
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: () => {
      return ['events', 'test'];
    },
    createEvent: (args: any) => {
      return args.name;
    },
  },
  graphiql: true,
});

export default graphqlApi;
