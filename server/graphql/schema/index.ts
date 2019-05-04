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

  type Booking {
    _id: ID!
    user: ID!
    event: ID!
    createdAt: String!
    updatedAt: String!
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

  input BookingInput {
    user: ID!
    event: ID!
  }

  type RootQuery {
    events: [Event!]!
    users: [User!]!
    user: User!
  }

  type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(input: UserInput): User
    createBooking(input: BookingInput): Booking
    cancelBooking(bookingId: ID!): Booking
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
