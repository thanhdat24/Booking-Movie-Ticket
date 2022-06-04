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
    const theaterSystem = await query;

    // var result = _.map(data, function (obj) {
    //   obj.showtimes = _.groupBy(obj.showtimes, 'idTheaterCluster.name');
    //   return obj;
    // });

    let array = [];
    theaterSystem.map((item123) => {
      item123.theatersystem.map((item) => {
        array.push(item);
      });
    });

    let result = _(array)
      .groupBy((x) => x.idMovie.name)
      .map((value, key) => ({
        movieName: key,
        movieList: value,
      }))
      .value();

    // var result = _.map(data, function (obj) {
    //   obj = _.groupBy(
    //     obj.movieList,
    //     'idTheaterCluster.name'
    //   );
    //   return obj;
    // });

    // var result = _.map(movieList, function (obj) {
    //   obj.movieList = _.groupBy(obj.movieList, 'idTheaterCluster.name');
    //   return obj;
    // });
    // const result = groupByMovie.map((item) => {
    //   return {
    //     ...item,
    //     ['movieId']: item.movieList[0].idMovie._id,
    //     ['photo']: item.movieList[0].idMovie.photo,
    //   };
    // });

    // let result = _(theaterMovieList.movieList[0])
    //   .groupBy((x) => x.idTheaterCluster.name)
    //   .map((value, key) => ({
    //     theaterClusterName: key,
    //     theaterClusterList: value,
    //   }))
    //   .value();

    // const result = groupByTheaterCluster.map((item) => {
    //   return {
    //     ...item,
    //     ['_id']: item.movieList[0].idTheaterCluster._id,
    //     ['address']: item.movieList[0].idTheaterCluster.address,
    //   };
    // });

    // let theaterClusterList = _(groupByTheaterSystem)
    //   .groupBy((x) => x.movieList[0].idTheaterSystem.name)
    //   .map((value, key) => ({ name: key, theaterClusterList: value }))
    //   .value();

    // const result = theaterClusterList.map((item) => {
    //   return {
    //     ...item,
    //     ['_id']: item.theaterClusterList[0].movieList[0].idTheaterSystem._id,
    //     ['logo']: item.theaterClusterList[0].movieList[0].idTheaterSystem.logo,
    //   };
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

exports.getAllTheaterSystem = factory.getAll(TheaterSystem, {
  path: 'theatersystem',
});
exports.createTheaterSystem = factory.createOneTheaterSystem(TheaterSystem);
exports.getDetailTheaterSystem = factory.getOne(TheaterSystem, {
  path: 'theatersystem idTheaterCluster',
});
exports.updateTheaterSystem = factory.updateOne(TheaterSystem);
exports.deleteTheaterSystem = factory.deleteOne(TheaterSystem);
