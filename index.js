require('dotenv').config();
const debug = require('debug');

const express = require('express');
const limiter = require('./helper/limiter');
const fs = require('fs');
const path = require('path');
const http2Express = require('http2-express-bridge');
const http2 = require('http2');

const morgan = require('morgan');
const connectDB = require('./config/db');
const userRouter = require('./routes/user.routes');

const app = http2Express(express);
debug('booting %o', app);

const options = {
  key: fs.readFileSync(`${__dirname}/localhost-key.pem`, 'utf8'),
  cert: fs.readFileSync(`${__dirname}/localhost.pem`, 'utf8'),
  allowHTTP1: true,
};

const port = process.env.PORT || 5555;

connectDB();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// middleware
app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.get('/', (req, res) => res.send('home page'));

app.use(userRouter);

http2.createSecureServer(options, app).listen(port, (_) => {
  console.log(`listening on port https://localhost:${port}`);
});
