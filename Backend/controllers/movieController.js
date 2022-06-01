const Movie = require('../models/movieModel');
const TheaterSystem = require('../models/theaterSystemModel');
const factory = require('../controllers/handlerFactory');
const multer = require('multer');
const ShowTime = require('../models/showtimeModel');
const _ = require('lodash');

const catchAsync = require('../utils/catchAsync');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img/movies');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `movie-${req.user.id}-${Date.now()}.${ext}`);
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

exports.uploadMoviePhoto = upload.single('photo');

exports.getMovieShowtimeInfo = catchAsync(async (req, res, next) => {
  try {
    let query = TheaterSystem.find().populate('theatersystem');
    let movieDoc = Movie.findById(req.params.id);
    let resultNotFound = await movieDoc;
    let flag = false;
    const theaterSystem = await query;
    let array = [];
    let movieList = [];
    theaterSystem.map((item123) => {
      item123.theatersystem.map((item) => {
        if (item.idMovie._id == req.params.id) {
          flag = true;
          array.push(item);
          movieList = [
            {
              _id: item.idMovie._id,
              name: item.idMovie.name,
              trailer: item.idMovie.trailer,
              description: item.idMovie.description,
              nowShowing: item.idMovie.nowShowing,
              comingSoon: item.idMovie.comingSoon,
              duration: item.duration,
              photo: item.idMovie.photo,
              genre: item.idMovie.genre,
              showtimes: item.idMovie.showtimes,
              duration: item.idMovie.duration,
              releaseDate: item.idMovie.releaseDate,
              idShowtime: item.idMovie._id,
              idTheater: [{ type: item.idTheater.type }],
            },
          ];
        } else {
          return;
        }
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
      };
    });

    let theaterClusterList = _(groupByTheaterSystem)
      .groupBy((x) => x.movieSchedule[0].idTheaterSystem.name)
      .map((value, key) => ({ name: key, theaterClusterList: value }))
      .value();

    const theaterSystemList = theaterClusterList.map((item) => {
      return {
        ...item,
        ['_id']:
          item.theaterClusterList[0].movieSchedule[0].idTheaterSystem._id,
        ['logo']:
          item.theaterClusterList[0].movieSchedule[0].idTheaterSystem.logo,
      };
    });

    const resultExist = movieList.map((item) => {
      return { ...item, theaterSystemList };
    });
    let result;
    if (flag) {
      result = resultExist;
    } else {
      result = [];
      result.push(resultNotFound);
    }
    res.status(200).json({
      status: 'success',
      data: result,
      result: result.length,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

exports.getAllMovie = factory.getAll(Movie, { path: 'showtimes' });
exports.createMovie = factory.createOne(Movie);
exports.getDetailMovie = factory.getOne(Movie, { path: 'showtimes' });
exports.updateMovie = factory.updateOne(Movie);
exports.deleteMovie = factory.deleteOne(Movie);
