const UserModel = require('../models/user-model')

exports.loginService = async (password, email) => {
  const user = await UserModel.findOne({ email }).select('+password')
  console.log(user)
  if (user && (await user.matchPassword(password, user?.password))) {
    console.log('Password is correct')
    return user
  }

  return null
}

exports.signupService = async (password, email, phoneNumber, name) => {
  const user = await UserModel.create({ password, email, phoneNumber, name })
  if (user) {
    return user
  }
  return null
}
