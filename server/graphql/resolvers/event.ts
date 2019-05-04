import Event from '../../../server/models/Event';

const events = () => {
  return Event.getAll();
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

const eventResolver = {
  events,
  createEvent,
};

export default eventResolver;
