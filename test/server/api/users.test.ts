import User from '../../../server/models/User';
import { setupTest } from './setup';

beforeAll(() => {
  return setupTest();
});

afterAll(() => {
  return setupTest();
});

describe('User', () => {

  describe('Create', () => {

    it('should save without error', async () => {
      const user = await User.createProfile({
        email: 'user44@mailinator.com',
        displayName: 'User3',
        password: '123456',
      });

      expect(user._id).toBeDefined();
    });
  });
});
