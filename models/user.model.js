const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a valid name"],
      immutable: true, // cannot change
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
      size: 1024 * 1024 * 1024, // The size is always important
      max: 1_000_000, // Maximum of 1million records
      autoIndexId: true,
    },
    collection: 'user-data',
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('User', userSchema);
