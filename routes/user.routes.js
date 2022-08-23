const router = require('express').Router();
const upload = require('../utils/multer');

const {
  signUp,
  userDashboard,
  loginUser,
  deleteAllUsers,
  getSingleUser,
  updateUser,
  getAllUsers,
} = require('../controllers/user__controller');
const { isAuth, validateAdmin } = require('../middleware/isAuth');

router.post('/signup', upload.single('photo'), signUp);

router.post('/login', loginUser);

router.get('/dashboard', isAuth, userDashboard);

router.delete('/delete', isAuth, validateAdmin, deleteAllUsers);

router.get('/:id', getSingleUser);

router.put('/:id', updateUser);

router.get('/api/all', getAllUsers);

module.exports = router;
