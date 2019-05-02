import * as graphql from 'express-graphql';
import { buildSchema } from 'graphql';
import Event from '../../server/models/Event';

const graphqlApi = graphql({
  schema: buildSchema(`
    type Event {
      _id: ID!
      userId: ID!
      title: String!
      tagline: String!
      description: String!
      label: String!
      length: String!
      maxPeople: Int!
      createdAt: String!
    }

    input EventInput {
      userId: String!
      title: String!
      tagline: String!
      description: String!
      label: String!
      length: String!
      maxPeople: Int!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): String
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
      const eventInput = args.eventInput;

      return Event.createEvent(eventInput)
        .then(response => {
          return response._id;
        }).catch(error => {
          throw error;
        });

    },
  },
  graphiql: true,
});

export default graphqlApi;
