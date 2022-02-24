const Booking = require('../models/bookingModel');
const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const ShowTime = require('../models/showtimeModel');

exports.createBooking = catchAsync(async (req, res, next) => {
  const { showtimeId, seatCodes } = req.body;
  const user = req.user;
  ShowTime.findById(showtimeId)
    .populate('idMovie')
    .populate('idTheater')
    .then((showtime) => {
      if (!showtime)
        return next(new AppError('Lịch chiếu không tồn tại!', 404));
      const availableSeatCodes = showtime.seatList
        .filter((seat) => !seat.isBooked)
        .map((seat) => seat._id);
      let bookedSeatCodes = [];
      seatCodes.forEach((code) => {
        if (availableSeatCodes.indexOf(code) === -1) bookedSeatCodes.push(code);
      });
      if (bookedSeatCodes.length > 0)
        return Promise.reject({
          status: 400,
          message: 'Ghế không có sẵn',
          notAvaiSeat: bookedSeatCodes,
        });
      const newTicket = new Booking({
        showtimeId,
        userId: user,
        seatList: seatCodes.map((seat) => ({
          isBooked: true,
          _id: seat,
          name: seat.nameSeat,
        })),
        totalPrice: showtime.ticketPrice * seatCodes.length,
      });
      showtime.seatList = showtime.seatList.map((seat) => {
        if (seatCodes.indexOf(`${seat._id}`) > -1) {
          seat.isBooked = true;
        }
        return seat;
      });
      Promise.all([newTicket.save(), showtime.save()]);
      res.status(201).json({
        status: 'success',
        data: newTicket,
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

exports.getAllBooking = factory.getAll(Booking);
exports.getDetailBooking = factory.getOne(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
