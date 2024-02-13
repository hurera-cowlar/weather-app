const express = require('express');
const userController = require('../controllers/user');
const { protect } = require('../middlewares/auth');

const router = express.Router();
router.route('/').get(userController.getAllUsers);
router.route('/:id').get(userController.getUser).delete(userController.deleteUser).patch(userController.updateUser);

module.exports = router;
