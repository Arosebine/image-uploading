const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a valid name'],
    },
    email: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
      immutable: true, // cannot change
    },
    image: {
      type: String,
      required: [true, 'please enter a valid image'],
      default:
        'https://res.cloudinary.com/oluwatobiloba/image/upload/v1628753027/Grazac/avatar_cihz37.png',
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
    capped: {
      size: 1024 * 1024 * 1024, // 1GB Maximum size
      autoIndexId: true,
    },
    collection: 'user-info',
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('User', userSchema);
