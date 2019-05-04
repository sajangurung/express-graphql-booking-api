import * as _ from 'lodash';

import { Document, Model, model, Schema } from 'mongoose';

const mongoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  event: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Event',
  },
},
{
  timestamps: true,
});

export interface IBookingDocument extends Document {
  user: string;
  event: string;
}

interface IBookingModel extends Model<IBookingDocument> {
  publicFields(): string[];

  createBooking({
    user,
    event,
  }): Promise<IBookingDocument>;

  cancelBooking({
    id,
  }): Promise<IBookingDocument>;

  getAll(): Promise<IBookingDocument>;
}

class BookingClass extends Model {
  public static publicFields(): string[] {
    return [
      '_id',
      'user',
      'event',
      'createdAt',
      'updatedAt',
    ];
  }

  public static async createBooking({user, event}) {
    let booking = await this.findOne({user, event});

    if (booking) {
      throw new Error('booking already exists');
    }

    booking = await this.create({user, event});
    return _.pick(booking, this.publicFields());
  }

  public static async cancelBooking(bookingId) {
    const booking = await this.findOne({ _id: bookingId});

    if (!booking) {
      throw new Error('booking doesn\'t exists');
    }

    try {
      await this.deleteOne({_id: bookingId});

      return booking;
    } catch (err) {
      throw err;
    }
  }
}

mongoSchema.loadClass(BookingClass);

const Booking = model<IBookingDocument, IBookingModel>('Booking', mongoSchema);

export default Booking;
