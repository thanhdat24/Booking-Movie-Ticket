const Theater = require('../models/theaterModel');
const factory = require('../controllers/handlerFactory');

const catchAsync = require('../utils/catchAsync');

exports.createTheater = catchAsync(async (req, res, next) => {
  const { name, type, idTheaterCluster } = req.body;

  const newTheater = new Theater({
    name,
    type,
    idTheaterCluster,
  });
  newTheater.save();

  res.status(200).json({
    status: 'success',
    data: newTheater,
  });
});

exports.getAllTheater = factory.getAll(Theater);
// exports.createTheater= factory.createOne(Theater);
exports.getDetailTheater = factory.getOne(Theater);
exports.updateTheater = factory.updateOne(Theater);
exports.deleteTheater = factory.deleteOne(Theater);
