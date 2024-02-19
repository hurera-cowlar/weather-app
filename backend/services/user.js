const UserModel = require('../models/user-model');

exports.getAllUsersService = async () => {
  const users = await UserModel.find();
  console.log(users);
  return users;
};

exports.getUserService = async (id) => {
  const user = await UserModel.findById(id);
  return user;
};

exports.updateUserService = async (id, name, phoneNumber) => {
  const user = await UserModel.findByIdAndUpdate(
    id,
    {
      name,
      phoneNumber,
    },
    { new: true }
  );

  return user;
};

exports.deleteUserService = async (id) => {
  const user = await UserModel.findByIdAndDelete(id);
  return user
};
