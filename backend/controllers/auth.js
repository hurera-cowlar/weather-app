const { loginService, signupService } = require('../services/auth');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { generateJWT } = require('../utils/jwt');

exports.login = catchAsync(async (req, res, next) => {
  const { password, email } = req.body;

  if (!password || !email)
    return next(new AppError('Please provide email and password', 401));

  const user = await loginService(password, email);

  if (user && (await user.matchPassword(password, user?.password))) {
    console.log('Password is correct');

    const jwt = generateJWT(user._id);

    return res.status(200).json({
      message: 'success',
      token: jwt,
    });
  }

  res.status(401).json({
    message: 'Wrong credentials',
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  const { password, email, phoneNumber, name } = req.body;

  if (!password || !email || !phoneNumber || !name)
    return next(new AppError('Please provide all the fields', 400));

  const user = await signupService(password, email, phoneNumber, name);

  if (user) {
    const jwt = generateJWT(user._id);
    return res.status(200).json({
      message: 'success',
      token: jwt,
    });
  }

  res.status(500).json({
    message: 'there was an error',
  });
});
