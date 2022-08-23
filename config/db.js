const mongoose = require('mongoose');

const db =
  process.env.NODE_ENV == 'development'
    ? process.env.MONGO_URI_DEV
    : process.env.MONGO_URI_PROD;

const connectDB = async () => {
  const conn = await mongoose.connect(db, {
    useNewUrlParser: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
