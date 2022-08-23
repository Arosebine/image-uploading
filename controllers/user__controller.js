const jwt = require('jsonwebtoken');
const { passwordHash, passwordCompare } = require('../helper/hashing');
const cloudinary = require('../utils/cloudinary');
const bcrypt = require('bcrypt');
const User = require('../models');
const {
  signUp,
  findAll,
  updateAUser,
  deleteAll,
  findUserByEmail,
} = require('../services/user.service');
const {
  registerValidation,
  loginValidation,
} = require('../validation/validation');
const { deleteOne } = require('../models/user.model');
const { jwtSign } = require('../helper/jwt');

exports.signUp = async (req, res, next) => {
  const { name, email, password, image } = req.body;
  try {
    const validation = registerValidation(req.body);
    if (validation.error)
      return res
        .status(400)
        .json({ message: validation.error.details[0].message });

    const result = await cloudinary.uploader.upload(req.file.path);
    const check_user = await findUserByEmail({ email });
    console.log(check_user);
    if (check_user) {
      return res.status(400).json({
        message: 'Email already exist',
      });
    }

    const hashedPassword = await passwordHash(password);
    const data = {
      name,
      email,
      password: hashedPassword,
      image: result.secure_url,
    };
    const new_user = await signUp(data);

    return res.status(201).json(new_user);
  } catch (error) {
    next(error);
  }
};

exports.userDashboard = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await findUserByEmail({ email });
    return res.status(200).json({ message: `Welcome ${user.name}` });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validation = loginValidation(req.body);
    if (validation.error)
      return res
        .status(400)
        .json({ message: validation.error.details[0].message });

    const user = await findUserByEmail({ email });
    //  validate password
    const isMatch = await passwordCompare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials',
      });
    }

    const payload = {
      id: user._id,
    };
    const token = jwtSign(payload);

    res.cookie('access_token', token, { httpOnly: true });
    const dataInfo = {
      status: 'success',
      message: 'Login success',
      access_token: token,
    };
    return res.status(200).json(dataInfo);
  } catch (error) {
    next(error);
  }
};

// get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await findAll();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
// get single user
exports.getSingleUser = async (req, res, next) => {
  try {
    const user = await findUserByEmail({ _id: req.params.id });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
// update user
exports.updateUser = async (req, res, next) => {
  try {
    const user = await findUserByEmail({ _id: req.params.id });
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    const { name, email, password, image } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);
    const data = {
      name,
      email,
      password,
      image: result.secure_url,
    };
    const updatedUser = await updateAUser({ _id: req.params.id }, data, {
      upsert: true,
      runValidators: true,
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await findUserByEmail({ _id: req.params.id });
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    const deletedUser = await deleteOne({ _id: req.params.id });
    return res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
};

exports.deleteAllUsers = async (req, res, next) => {
  try {
    const users = await findAll();
    const deletedUsers = await deleteAll();
    return res.status(200).json(deletedUsers);
  } catch (error) {
    next(error);
  }
};
