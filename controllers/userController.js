const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedField) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedField.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

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

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error ì user POSTS password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not fro password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  // 2) Update user document
  // Get filtered name and email
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success ',
    data: {
      user: updateUser,
    },
  });
});

exports.deleteUser = (req, res) => {
  res.status(500).send({ status: 'error', message: 'Not Found' });
};
