const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { userService } = require('../services/user.service');

exports.signUp = async (req, res, next) => {
  const { name, email, password, image } = req.body;
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const check_user = await userService.findSingleUser({ email }); // email:email
    if (check_user) {
      return res.status(400).json({
        message: 'Email already exist',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const data = {
      name,
      email,
      password: hash,
      image: result.secure_url,
    };
    const new_user = await userService.signUp(data);

    return res.status(201).json(new_user);
  } catch (error) {
    next(error);
  }
};

exports.userDashboard = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await userService.findSingleUser({ email });
    return res.status(200).json({ message: `Welcome ${user.name}` });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userService.findSingleUser({ email });
    //  validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials',
      });
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

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
    const users = await userService.find();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
// get single user
exports.getSingleUser = async (req, res, next) => {
  try {
    const user = await userService.findSingleUser({ _id: req.params.id });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
// update user
exports.updateUser = async (req, res, next) => {
  try {
    const user = await userService.findSingleUser({ _id: req.params.id });
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
    const updatedUser = await userService.updateUser(
      { _id: req.params.id },
      data
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await userService.findSingleUser({ _id: req.params.id });
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    const deletedUser = await userService.deleteUser({ _id: req.params.id });
    return res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
};

exports.deleteAllUsers = async (req, res, next) => {
  try {
    const users = await userService.find();
    const deletedUsers = await userService.deleteAllUsers();
    return res.status(200).json(deletedUsers);
  } catch (error) {
    next(error);
  }
};
