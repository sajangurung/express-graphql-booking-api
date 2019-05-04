import Booking from '../../../server/models/Booking';

const createBooking = async (args: any) => {
  const input = args.input;

  try {
    return await Booking.createBooking(input);
  } catch (err) {
    throw err;
  }
};

const cancelBooking = async (args: any) => {
  try {
    return await Booking.cancelBooking(args.bookingId);
  } catch (err) {
    throw err;
  }
};

const bookingResolver = {
  createBooking,
  cancelBooking,
};

export default bookingResolver;
