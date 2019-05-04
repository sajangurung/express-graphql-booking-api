import User from '../../../server/models/User';

const users = async () => {
  return await User.getAll();
};

const user = async (id: string) => {
  return await User.findById(id);
};

const createUser = async (args: any) => {
  const input = args.input;

  try {
    return await User.createProfile(input);
  } catch (err) {
    throw err;
  }
};

const userResolver = {
  users,
  user,
  createUser,
};

export default userResolver;
