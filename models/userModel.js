const mongoose = require('mongoose');
var validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    // chuyển về chữ thường
    lowercase: true,
    // check email
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide a passwordConfirm'],
    // validate check 2 password equal
    // this only works on CREATE and SAVE!!! ( NOT UPDATE )
    validate: {
      validator: function (el) {
        return el === this.password; // abc === abc
      },
      messages: 'password are not a same!',
    },
  },
});

userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
