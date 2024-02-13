const jwt = require('jsonwebtoken');

const generateJWT = (userID, next) => {
  const jwtSecretKey = process.env.JWT_SECRET;
  if (!jwtSecretKey) {
    return next(new AppError('Internal Server Error', 500));
  }

  const token = jwt.sign({ id: userID }, jwtSecretKey, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const extractFromJWT = (userID, next) => {
  const jwtSecretKey = process.env.JWT_SECRET;
  if (!jwtSecretKey) {
    return next(new AppError('Internal Server Error', 500));
  }

  const token = jwt.sign({ id: userID }, jwtSecretKey, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

module.exports = { generateJWT, extractFromJWT };
