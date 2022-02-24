const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  name: { type: String },
  isBooked: { type: Boolean, default: false },
});


const Seat = mongoose.model('Seat', seatSchema, 'Seat');

module.exports = { Seat, seatSchema };
