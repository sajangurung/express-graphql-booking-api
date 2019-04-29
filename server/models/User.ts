import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import * as mongoose from 'mongoose';

import { generateSlug } from '../utils/slugify';

const mongoSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  displayName: String,
  avatarUrl: String,
});

export interface IUserDocument extends mongoose.Document {
  slug: string;
  createdAt: Date;
  email: string;
  password: string;
  isAdmin: boolean;
  displayName: string;
  avatarUrl: string;
}

interface IUserModel extends mongoose.Model<IUserDocument> {
  publicFields(): string[];

  getAll(): Promise<IUserDocument>;

  updateProfile({
    email,
    name,
    avatarUrl,
  }: {
  email: string;
  name: string;
  avatarUrl: string;
  }): Promise<IUserDocument[]>;

  createProfile({
    email,
    displayName,
    password,
  }: {
  email: string;
  displayName: string,
  password: string;
  }): Promise<IUserDocument>;
}

class UserClass extends mongoose.Model {
  public static async getAll() {
    const users = await this.find();

    return users.map(user => _.pick(user, this.publicFields()));
  }

  public static async updateProfile({ userId, name, avatarUrl }) {

    const user = await this.findById(userId, 'slug displayName');

    if (!user) {
      return;
    }

    const modifier = { displayName: user.displayName, avatarUrl, slug: user.slug };

    if (name !== user.displayName) {
      modifier.displayName = name;
      modifier.slug = await generateSlug(this, name);
    }

    return this.findByIdAndUpdate(userId, { $set: modifier }, { new: true, runValidators: true })
      .select('displayName avatarUrl slug')
      .setOptions({ lean: true });
  }

  public static async createProfile({ email, displayName, password }) {

    const slug = await generateSlug(this, displayName);

    const hash = bcrypt.hashSync(password, 10);

    const newUser = await this.create({
      createdAt: new Date(),
      email,
      displayName,
      password: hash,
      slug,
    });

    return _.pick(newUser, this.publicFields());
  }

  public static publicFields(): string[] {
    return [
      '_id',
      'id',
      'displayName',
      'email',
      'avatarUrl',
      'slug',
    ];
  }
}

mongoSchema.loadClass(UserClass);

const User = mongoose.model<IUserDocument, IUserModel>('User', mongoSchema);

export default User;
