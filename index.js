require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
const userRouter = require('./routes/user.routes');
const app = express();

const port = process.env.PORT || 5555;
connectDB()
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('home page'));

app.use(userRouter);
app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
