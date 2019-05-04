import * as graphql from 'express-graphql';
import { buildSchema } from 'graphql';
import Event from '../../server/models/Event';
import User from '../../server/models/User';

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
      user: User!
    }

    type User {
      _id: ID!
      displayName: String
      email: String
      avatarUrl: String
      slug: String
      events: [Event!]
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

    input UserInput {
      displayName: String!
      email: String!
      password: String!
    }

    type RootQuery {
      events: [Event!]!
      users: [User!]!
      user: User!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: () => {
      return Event.getAll();
    },
    users: async () => {
      return await User.getAll();
    },
    user: async (id: string) => {
      return await User.findById(id);
    },
    createEvent: async (args: any) => {
      const eventInput = args.eventInput;

      try {
        const event = await Event.createEvent(eventInput);
        return event;

      } catch (err) {
        throw err;
      }
    },
    createUser: async (args: any) => {
      const input = args.input;

      try {
        const user = await User.createProfile(input);
        return user;
      } catch (err) {
        throw err;
      }
    },
  },
  graphiql: true,
});

export default graphqlApi;
