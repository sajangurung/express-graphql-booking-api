import { buildSchema } from 'graphql';

export const rootSchema = buildSchema(`
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
`);
