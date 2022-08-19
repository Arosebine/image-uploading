const router = require('express').Router();
const upload = require('../utils/multer');

const {
  signUp,
  userDashboard,
  loginUser,
  deleteAllUsers,
} = require('../controllers/user__controller');
const { isAuth } = require('../middleware/isAuth');

router.post('/signup', upload.single('image'), signUp);

router.post('/login', loginUser);

router.get('/dashboard', isAuth, userDashboard);

router.delete('/delete', deleteAllUsers);

module.exports = router;
