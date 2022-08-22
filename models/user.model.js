const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    image: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minLength: 7,
      required: true,
      validate(value) {
        if (value.toLowerCase().includes('pass')) {
          throw new Error("Passwords cannot contain 'pass'");
        }
      },
    },
  },
  {
    collection: 'user-data',
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
