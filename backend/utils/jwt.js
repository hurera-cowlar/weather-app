const jwt = require('jsonwebtoken');
const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = require('../config/env-config');

const generateJWT = (userID, next) => {
  const jwtSecretKey = JWT_SECRET;
  if (!jwtSecretKey) {
    return next(new AppError('Internal Server Error', 500));
  }

  const token = jwt.sign({ id: userID }, jwtSecretKey, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return token;
};

const extractFromJWT = (userID, next) => {
  const jwtSecretKey = JWT_SECRET;
  if (!jwtSecretKey) {
    return next(new AppError('Internal Server Error', 500));
  }

  const token = jwt.sign({ id: userID }, jwtSecretKey, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return token;
};

module.exports = { generateJWT, extractFromJWT };
