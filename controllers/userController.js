const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  const user = await User.find();
  if (user) {
    res.status(200).json({
      status: 'success',
      data: {
        user: user,
      },
    });
  } else {
    res.status(500).send({ status: 'error', message: 'Not Found' });
  }
};

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
