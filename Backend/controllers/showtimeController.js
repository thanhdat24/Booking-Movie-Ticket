const ShowTime = require('../models/showtimeModel');
const { Seat } = require('../models/seatModel');
const seatType = require('../dev-data/data/seatType.json');
const factory = require('./handlerFactory');

const catchAsync = require('../utils/catchAsync');

exports.createShowTime = catchAsync(async (req, res, next) => {
  const {
    idMovie,
    idTheater,
    dateShow,
    idTheaterSystem,
    idTheaterCluster,
    ticketPrice,
  } = req.body;
  let seatCode = [];
  for (let types of seatType) {
    seatCode = types.seatList;
  }
  let seatList = [];
  seatCode.map((name) => {
    const seat = new Seat({ name, isBooked: false });
    seatList.push(seat);
  });
  const newShowtime = new ShowTime({
    idMovie,
    idTheater,
    idTheaterSystem,
    idTheaterCluster,
    dateShow,
    seatList,
    ticketPrice,
  });
  newShowtime.save();

  res.status(200).json({
    status: 'success',
    data: newShowtime,
  });
});

exports.getDetailShowTime = catchAsync(async (req, res, next) => {
  ShowTime.findById(req.params.id)
    .populate('idMovie')
    .populate('idTheater')
    .then((showtime) => {
      if (!showtime)
        return Promise.reject({
          status: 404,
          message: 'Lịch chiếu không tồn tại!',
        });
      const showtimeId = showtime._id;
      const theaterClusterName = showtime.idTheater.idTheaterCluster.name;
      const theaterClusterPhoto = showtime.idTheater.idTheaterCluster.photo;
      const theaterSystemName =
        showtime.idTheater.idTheaterCluster.idTheaterSystem.name;
      const theaterSystemLogo =
        showtime.idTheater.idTheaterCluster.idTheaterSystem.logo;
      const theaterName = showtime.idTheater.name;
      const address = showtime.idTheater.idTheaterCluster.address;
      const movieId = showtime.idMovie._id;
      const movieName = showtime.idMovie.name;
      const moviePhoto = showtime.idMovie.photo;
      const dateShow = showtime.dateShow;
      const ticketPrice = showtime.ticketPrice;
      const seatList = [];
      showtime.seatList.map((seat) => {
        seatList.push(seat);
      });
      const infoShowtime = {
        showtimeId,
        theaterClusterName,
        theaterName,
        address,
        movieId,
        moviePhoto,
        dateShow,
        ticketPrice,
        theaterSystemName,
        theaterClusterPhoto,
        theaterSystemLogo,
        movieName,
      };
      res.status(200).json({
        status: 'success',
        // length: 1,
        data: infoShowtime,
        seatList,
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

exports.getAllShowTime = factory.getAll(ShowTime);
// exports.createShowTime = factory.createOne(ShowTimes);
// exports.getDetailShowTime = factory.getOne(ShowTime);
exports.updateShowTime = factory.updateOne(ShowTime);
exports.deleteShowTime = factory.deleteOne(ShowTime);
