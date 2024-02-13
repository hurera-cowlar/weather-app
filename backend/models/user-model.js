const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please enter your phone'],
    },
    password: {
      type: String,
      select: false,
      required: [true, 'Please enter your password'],
      minlength: [8, 'Password should be atleast 8 characters long'],
    },
  },
  {
    collection: 'users',
  }
);

userSchema.methods.encryptPassword = async (pass_) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = bcrypt.hash(pass_, salt);
  return hash;
};

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.matchPassword = async function (
  candidatePassword,
  actualPass
) {
  console.log(candidatePassword, actualPass);
  const match = await bcrypt.compare(candidatePassword, actualPass);
  return match;
};

module.exports = mongoose.model('User', userSchema);
