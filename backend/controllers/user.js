const UserModel = require('../models/user-model');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await UserModel.find();

  res.status(200).json({
    message: 'success',
    data: users,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);
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

  const user = await UserModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      phoneNumber,
    },
    { new: true }
  );

  if (!user) return next(new AppError('No such user founf', 404));

  res.status(200).json({
    message: 'success',
    data: user,
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  await UserModel.findByIdAndDelete(req.params.id);
  res.status(204).json({
    message: 'success',
  });
});
