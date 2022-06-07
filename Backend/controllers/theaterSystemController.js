const TheaterSystem = require('../models/theaterSystemModel');
const factory = require('../controllers/handlerFactory');
const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
const _ = require('lodash');
const Movie = require('../models/movieModel');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img/theaters-system');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `theaters-system-${req.user.id}-${Date.now()}.${ext}`);
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

exports.uploadTheaterSystem = upload.single('logo');

exports.getInfoShowtimeOfTheaterSystem = catchAsync(async (req, res, next) => {
  try {
    let query = TheaterSystem.find().populate('theatersystem');
    let array = [];
    const theaterSystem = await query;
    theaterSystem.map((item123) => {
      item123.theatersystem.map((item) => {
        array.push(item);
      });
    });

    let groupByTheaterCluster = _(array)
      .groupBy((x) => x.idTheaterCluster.name)
      .map((value, key) => ({ name: key, movieSchedule: value }))
      .value();

    const groupByTheaterSystem = groupByTheaterCluster.map((item) => {
      return {
        ...item,
        ['_id']: item.movieSchedule[0].idTheaterCluster._id,
        ['address']: item.movieSchedule[0].idTheaterCluster.address,
        ['photo']: item.movieSchedule[0].idTheaterCluster.photo,
      };
    });

    let theaterClusterList = _(groupByTheaterSystem)
      .groupBy((x) => x.movieSchedule[0].idTheaterSystem.name)
      .map((value, key) => ({ name: key, theaterClusterList: value }))
      .value();

    const result = theaterClusterList.map((item) => {
      return {
        ...item,
        ['_id']:
          item.theaterClusterList[0].movieSchedule[0].idTheaterSystem._id,
        ['logo']:
          item.theaterClusterList[0].movieSchedule[0].idTheaterSystem.logo,
      };
    });


    res.status(200).json({
      status: 'success',
      data: result,
      result: result.length,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

exports.getAllTheaterSystem = factory.getAll(TheaterSystem, {
  path: 'theatersystem',
});
exports.createTheaterSystem = factory.createOneTheaterSystem(TheaterSystem);
exports.getDetailTheaterSystem = factory.getOne(TheaterSystem, {
  path: 'theatersystem idTheaterCluster',
});
exports.updateTheaterSystem = factory.updateOne(TheaterSystem);
exports.deleteTheaterSystem = factory.deleteOne(TheaterSystem);
