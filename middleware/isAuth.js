const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const dotenv = require('dotenv');
dotenv.config();
const { JWT_SECRET } = process.env; // const JWT_SECRET =process.env.JWT_SECRET

exports.isAuth = async (req, res, next) => {
  try {
    // console.log(req.headers.authorization);

    //Bearer token
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const decoded = await jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      throw new Error();
    }
    req.user = decoded;
    console.log('==========================================req.user');
    console.log(req.user);
    console.log('==========================================req.user');

    next();
  } catch (e) {
    return res.status(401).json(`signUp as user || Token expired  \n ${e}`);
  }
};
