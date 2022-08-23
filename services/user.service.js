const User = require('../models/user.model');

exports.signUp = async (data) => {
  try {
    const user = new User(data);
    const savedUser = user.save();
    if (!savedUser) throw new Error();
    return savedUser;
  } catch (error) {
    return { error: error.message };
  }
};

exports.findAll = async () => {
  try {
    const users = await User.find({});

    if (!users) throw new Error();

    return { error: null, data: users };
  } catch (error) {
    return { error: error.message, data: null };
  }
};

exports.findUserByEmail = async (email) => {
  try {
    const user = await User.findOne(email);

    // if (!user) throw new Error();

    return user;
  } catch (error) {
    return { error: error.message, data: null };
  }
};

exports.findUsersById = async (id) => {
  try {
    const user = await User.findById(id);

    if (!user) throw new Error();

    return { error: null, data: user };
  } catch (error) {
    return { error: error.message, data: null };
  }
};

exports.updateAUser = async (id, data) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

    if (!updatedUser) throw new Error();

    return { error: null, data: updatedUser };
  } catch (error) {
    return { error: error.message, data: null };
  }
};

exports.deleteOne = async (id) => {
  try {
    const isDeleted = await User.findByIdAndDelete(id);

    if (!isDeleted) throw new Error('');

    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

exports.deleteAll = async () => {
  try {
    const isDeleted = await User.deleteMany({});

    if (!isDeleted) throw new Error('');

    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};
