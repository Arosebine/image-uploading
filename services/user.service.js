const User = require('../models/user.model');

exports.userService = {
  find: () => User.find({}),

  findSingleUser: (id) => User.findOne(id),

  signUp: async (userData) => {
    const user = new User({ ...userData });
    await user.save();
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    return user;
  },

  deleteAllUsers: async () => {
    await User.deleteMany({});
  },
};
