const mongoose = require('mongoose');

const connect = async (req, res) => {
  try {
    await mongoose.connect('mongodb://0.0.0.0:27017/ima', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to mongodb');
  } catch (error) {
    console.log(error);
  }
};

connect();

const User = require('./models/user.model');

const data = [
  {
    name: 'John Doe',
    email: 'doe@gmail.com',
    password: '123456',
    image: 'https://i.imgur.com/y9J5s.png',
  },
  {
    name: 'Wick Doe',
    email: 'wick@gmail.com',
    password: '123456',
    image: 'https://i.imgur.com/y9J5s.png',
  },
  {
    name: 'James Doe',
    email: 'doe@gmail.com',
    password: '123456',
    image: 'https://i.imgur.com/y9J5s.png',
  },
];

// seed
const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(data);
    console.log('Seeding success');
  } catch (error) {
    console.log(error);
  }
};

seedDatabase().then(() => {
  mongoose.connection.close();
});
