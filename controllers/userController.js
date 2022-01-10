const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.getUserByID = (req, res) => {
  res.status(500).send({ status: 'error', message: 'Not Found' });
};

exports.createUser = (req, res) => {
  res.status(500).send({ status: 'error', message: 'Not Found' });
};

exports.updateUpdate = (req, res) => {
  res.status(500).send({ status: 'error', message: 'Not Found' });
};

exports.deleteUser = (req, res) => {
  res.status(500).send({ status: 'error', message: 'Not Found' });
};
