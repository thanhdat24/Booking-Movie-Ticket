const TheaterCluster = require('../models/theaterClusterModel');
const factory = require('../controllers/handlerFactory');
const multer = require('multer');
const theaterType = require('../dev-data/data/theaterType.json');
const { Theater } = require('../models/theaterModel');
const catchAsync = require('../utils/catchAsync');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img/theaters-cluster');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `theaters-cluster-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('Không phải hình ảnh! Vui lòng tải file hình ảnh.', 400),
      false
    );
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadTheaterCluster = upload.single('photo');

exports.createTheaterCluster = catchAsync(async (req, res, next) => {
  const { name, address, idTheaterSystem } = req.body;

  const newTheaterCluster = new TheaterCluster({
    name,
    address,
    idTheaterSystem,
  });
  newTheaterCluster.save();

  res.status(200).json({
    status: 'success',
    data: newTheaterCluster,
  });
});

exports.getAllTheaterCluster = factory.getAll(TheaterCluster);
// exports.createTheaterCluster = factory.createOne(TheaterCluster);
exports.getDetailTheaterCluster = factory.getOne(TheaterCluster, {
  path: 'theaterList',
});
exports.updateTheaterCluster = factory.updateOne(TheaterCluster);
exports.deleteTheaterCluster = factory.deleteOne(TheaterCluster);
