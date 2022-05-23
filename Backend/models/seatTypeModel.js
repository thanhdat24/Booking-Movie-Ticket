const mongoose = require('mongoose');

const seatTypeSchema = new mongoose.Schema({
  seatType: { type: String },
});

const SeatType = mongoose.model('SeatType', seatTypeSchema, 'SeatType');

module.exports = { SeatType, seatTypeSchema };
