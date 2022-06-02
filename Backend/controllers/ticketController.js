const Ticket = require('../models/ticketModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const ShowTime = require('../models/showtimeModel');

exports.createTicket = catchAsync(async (req, res, next) => {
  const { idShowtime, seatCodes } = req.body;
  const user = req.user;
  ShowTime.findById(idShowtime)
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

      let invalidSeat = [];
      seatCodes.forEach((name) => {
        if (availableSeatCodes.indexOf(name) === -1) invalidSeat.push(name);
      });
      if (invalidSeat.length > 0)
        return Promise.reject({
          status: 400,
          message: 'Ghế đã được đặt!',
          notAvaiSeat: invalidSeat,
        });
      const newTicket = new Ticket({
        idShowtime,
        userId: user,
        seatList: seatCodes.map((seat) => ({
          isBooked: true,
          name: seat,
        })),
        price: showtime.ticketPrice,
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

exports.getAllTicket = factory.getAll(Ticket, { path: 'showtimes' });
exports.getDetailTicket = factory.getOne(Ticket);
exports.updateTicket = factory.updateOne(Ticket);
exports.deleteTicket = factory.deleteOne(Ticket);
