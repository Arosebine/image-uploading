const router = require('express').Router();
const upload = require('../utils/multer');
const cloudinary = require('../utils/cloudinary');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

router.post('/signup', upload.single('image'), async (req, res, next) => {
  const { name, email, password, image } = req.body;
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const check_user = await User.findOne({ email }); // email:email
    if (check_user) {
      return res.status(400).json({
        message: 'Email already exist',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log(hash);

    // const new_user = await User.create({
    //   name,
    //   email,
    //   image: result.secure_url || 'https://i.imgur.com/y9J5s.png',
    //   password,
    // });

    // return res.status(200).json(new_user);
  } catch (error) {
    next(error);
  }
});

// login
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'Email not found',
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Password is incorrect',
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
