const Seat = require('../models/seatModel');

const factory = require('../controllers/handlerFactory');

exports.getAllSeat = factory.getAll(Seat);
exports.createSeat = factory.createOne(Seat);
exports.getDetailSeat = factory.getOne(Seat);
exports.updateSeat = factory.updateOne(Seat);
exports.deleteSeat = factory.deleteOne(Seat);
