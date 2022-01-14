const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('../controllers/handlerFactory');

const filterObj = (obj, ...allowedField) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedField.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};


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
  const filteredBody = filterObj(req.body, 'name', 'email', 'active');
  
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

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success ',
  });
});

exports.getAllUsers = factory.getAll(User);
exports.getDetailUser = factory.getOne(User);
// Do Not update password with this
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
