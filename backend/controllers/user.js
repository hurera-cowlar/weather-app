const UserModel = require('../models/user-model');
const {
  getAllUsersService,
  getUserService,
  updateUserService,
  deleteUserService,
} = require('../services/user');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await getAllUsersService();
  console.log(users);

  res.status(200).json({
    message: 'success',
    data: users,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await getUserService(req.params.id);

  if (!user) return next(new AppError('No such user found', 404));
  res.status(200).json({
    message: 'success',
    data: user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, phoneNumber } = req.body;

  if (!name && !phoneNumber)
    return next(new AppError('Nothing sent to update', 401));

  const user = await updateUserService(
    req.params.id,
    name,
    phoneNumber
  );

  if (!user) return next(new AppError('No such user found', 404));

  res.status(200).json({
    message: 'success',
    data: user,
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const user = await deleteUserService(req.params.id);
  if (!user) return next(new AppError('No such user founf', 404));

  res.status(204).json({
    message: 'success',
  });
});
