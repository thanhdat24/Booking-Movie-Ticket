const ShowTime = require('../models/showtimeModel');
const { Seat } = require('../models/seatModel');
const seatType = require('../dev-data/data/seatType.json');
const factory = require('./handlerFactory');

const catchAsync = require('../utils/catchAsync');

exports.createShowTime = catchAsync(async (req, res, next) => {
  const { idMovie, idTheater, dateShow, ticketPrice } = req.body;
  let seatCode = [];
  for (let types of seatType) {
    seatCode = types.seatList;
  }
  let seatList = [];
  seatCode.map((code) => {
    const seat = new Seat({ name: code.nameSeat, code, isBooked: false });
    seatList.push(seat);
  });
  //   seatCode.forEach((code) => {});
  //   console.log('seatList', seatList);
  const newShowtime = new ShowTime({
    idMovie,
    idTheater,
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

exports.getAllShowTime = factory.getAll(ShowTime);
// exports.createShowTime = factory.createOne(ShowTimes);
exports.getDetailShowTime = factory.getOne(ShowTime);
exports.updateShowTime = factory.updateOne(ShowTime);
exports.deleteShowTime = factory.deleteOne(ShowTime);
