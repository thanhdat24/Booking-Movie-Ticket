const Ticket = require('../models/ticketModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const ShowTime = require('../models/showtimeModel');

exports.createTicket = catchAsync(async (req, res, next) => {
  const { showtimeId, seatCodes } = req.body;
  const user = req.user;
  ShowTime.findById(showtimeId)
    .populate('idMovie')
    .populate('idTheater')
    .then((showtime) => {
      if (!showtime)
        return Promise.reject({
          status: 404,
          message: 'Lịch chiếu không tồn tại!',
        });
      const availableSeatCodes = showtime.seatList
        .filter((seat) => !seat.isBooked)
        .map((seat) => seat.name);

      let bookedSeatCodes = [];
      seatCodes.forEach((name) => {
        if (availableSeatCodes.indexOf(name) === -1) bookedSeatCodes.push(name);
      });
      if (bookedSeatCodes.length > 0)
        return Promise.reject({
          status: 400,
          message: 'Ghế không tồn tại!',
          notAvaiSeat: bookedSeatCodes,
        });
      const newTicket = new Ticket({
        showtimeId,
        userId: user,
        seatList: seatCodes.map((seat) => ({
          isBooked: true,
          name: seat,
        })),
        totalPrice: showtime.ticketPrice * seatCodes.length,
      });
      showtime.seatList = showtime.seatList.map((seat) => {
        if (seatCodes.indexOf(seat.name) > -1) {
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

exports.getAllTicket = factory.getAll(Ticket);
exports.getDetailTicket = factory.getOne(Ticket);
exports.updateTicket = factory.updateOne(Ticket);
exports.deleteTicket = factory.deleteOne(Ticket);
