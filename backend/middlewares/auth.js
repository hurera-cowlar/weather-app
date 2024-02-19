const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/env-config')

exports.protect = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization)
    return next(new AppError('You must login to accesss this route', 401))

  jwt.verify(authorization, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' })
    }
    req.user = decoded
    next()
  })
})
