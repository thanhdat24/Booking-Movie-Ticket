const TheaterSystem = require('../models/theaterSystemModel');
const TheaterCluster = require('../models/theaterClusterModel');
const factory = require('../controllers/handlerFactory');
const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
const _ = require('lodash');

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

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fieldSize: 2 * 1024 * 1024 },
});

exports.uploadTheaterCluster = upload.single('photo');

exports.getMovieInfoTheaterCluster = catchAsync(async (req, res, next) => {
  try {
    let query = TheaterSystem.find().populate('theatersystem');
    const theaterSystem = await query;
    let array = [];
    theaterSystem.map((item123) => {
      item123.theatersystem.map((item) => {
        if (item.idMovie._id == req.params.id) {
          array.push(item);
        }
      });
    });

    let groupByTheaterCluster = _(array)
      .groupBy((x) => x.idTheaterCluster.name)
      .map((value, key) => ({ name: key, movieSchedule: value }))
      .value();

    const result = groupByTheaterCluster.map((item) => {
      return {
        ...item,
        ['_id']: item.movieSchedule[0].idTheaterCluster._id,
        ['address']: item.movieSchedule[0].idTheaterCluster.address,
      };
    });

    // let theaterClusterList = _(groupByTheaterSystem)
    //   .groupBy((x) => x.movieSchedule[0].idTheaterSystem.name)
    //   .map((value, key) => ({ name: key, theaterClusterList: value }))
    //   .value();

    // const theaterSystemList = theaterClusterList.map((item) => {
    //   return {
    //     ...item,
    //     ['_id']:
    //       item.theaterClusterList[0].movieSchedule[0].idTheaterSystem._id,
    //     ['logo']:
    //       item.theaterClusterList[0].movieSchedule[0].idTheaterSystem.logo,
    //   };
    // });

    // const result = movieList.map((item) => {
    //   return { ...item, theaterSystemList };
    // });
    res.status(200).json({
      status: 'success',
      data: result,
      result: result.length,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// exports.createTheaterCluster = catchAsync(async (req, res, next) => {
//   const { name, address, idTheaterSystem } = req.body;

//   const newTheaterCluster = new TheaterCluster({
//     name,
//     address,
//     idTheaterSystem,
//   });
//   newTheaterCluster.save();

//   res.status(200).json({
//     status: 'success',
//     data: newTheaterCluster,
//   });
// });

exports.getAllTheaterCluster = factory.getAll(TheaterCluster);
exports.createTheaterCluster = factory.createOne(
  TheaterCluster,
  'image_theater_cluster',
  'photo',
  ''
);
exports.getDetailTheaterCluster = factory.getOne(TheaterCluster, {
  path: 'theaterList',
});
exports.updateTheaterCluster = factory.updateOne(TheaterCluster);
exports.deleteTheaterCluster = factory.deleteOne(TheaterCluster);
