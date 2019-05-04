import bookingResolver from './Booking';
import eventResolver from './event';
import userResolver from './user';

export const rootResolver = {
  ...userResolver,
  ...eventResolver,
  ...bookingResolver,
};
