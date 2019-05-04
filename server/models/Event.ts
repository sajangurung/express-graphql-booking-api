
import * as _ from 'lodash';
import * as mongoose from 'mongoose';
import User from './User';

const mongoSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  tagline: String,
  description: String,
  label: String,
  length: String,
  maxPeople: Number,
});

export interface IUserDocument extends mongoose.Document {
  userId: string;
  createdAt: Date;
  title: string;
  tagline: string;
  description: string;
  label: string;
  length: string;
  maxPeople: string;
}

interface IUserModel extends mongoose.Model<IUserDocument> {
  publicFields(): string[];

  updateEvent({
    id,
    userId,
    tagline,
    description,
    label,
    length,
    maxPeople,
  }: {
    id: string,
    userId: string,
    tagline: string,
    description: string,
    label: string,
    length: string,
    maxPeople: string,
  }): Promise<IUserDocument>;

  createEvent({
    userId,
    title,
    tagline,
    description,
    label,
    length,
    maxPeople,
  }: {
    userId: string,
    title: string,
    tagline: string,
    description: string,
    label: string,
    length: string,
    maxPeople: string,
  }): Promise<IUserDocument>;

  getAll(): Promise<IUserDocument>;
}

class EventClass extends mongoose.Model {
  public static async updateEvent({ id, userId, tagline, description, label, length, maxPeople }) {
    const event = await this.findById(id, 'userId tagline description label length maxPeople');

    if (!event) {
      throw new Error('not_found');
    }

    if (event.userId !== userId) {
      throw new Error('unauthorized');
    }

    const modifier = {
      tagline,
      description,
      label,
      length,
      maxPeople,
    };

    return this.findByIdAndUpdate(id, { $set: modifier }, { new: true, runValidators: true })
      .select('tagline description label length maxPeople')
      .setOptions({ lean: true });
  }

  public static async createEvent({userId, title, tagline, description, label, length, maxPeople}) {
    const newEvent = await this.create({
      createdAt: new Date(),
      userId,
      title,
      tagline,
      description,
      label,
      length,
      maxPeople,
    });

    return _.pick(newEvent, this.publicFields());
  }

  public static async getAll() {
    const findUser = async userId => {
      return await User.findById(userId);
    };

    const events = await this.find()
                      .select(this.publicFields().join(' '))
                      .setOptions({ lean: true });

    return events.map(event => {
      return {
        ...event,
        user: findUser.bind(this, event.userId),
      };
    });
  }

  public static publicFields(): string[] {
    return [
      '_id',
      'id',
      'userId',
      'title',
      'tagline',
      'description',
      'label',
      'length',
      'maxPeople',
      'createdAt',
    ];
  }
}

mongoSchema.loadClass(EventClass);

const Event = mongoose.model<IUserDocument, IUserModel>('Event', mongoSchema);

export default Event;
