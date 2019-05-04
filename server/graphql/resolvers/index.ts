import Event from '../../../server/models/Event';
import User from '../../../server/models/User';

const events = () => {
  return Event.getAll();
};

const users = async () => {
  return await User.getAll();
};

const user = async (id: string) => {
  return await User.findById(id);
};

const createEvent = async (args: any) => {
  const eventInput = args.eventInput;

  try {
    const event = await Event.createEvent(eventInput);
    return event;
  } catch (err) {
    throw err;
  }
};

const createUser = async (args: any) => {
  const input = args.input;

  try {
    return await User.createProfile(input);
  } catch (err) {
    throw err;
  }
};

export const rootResolver = {
  users,
  user,
  createUser,
  events,
  createEvent,
};
