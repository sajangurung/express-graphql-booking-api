import User from '../../../server/models/User';
describe('User', () => {

  describe('Create', () => {
    it('should save without error', () => {
      const user = User.createProfile({
        email: 'user44@mailinator.com',
        displayName: 'User3',
        password: '123456',
      });

      expect(user).toBeDefined();
    });
  });
});
