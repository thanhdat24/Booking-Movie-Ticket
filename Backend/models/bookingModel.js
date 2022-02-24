const mongoose = require('mongoose');
const { seatSchema } = require('./seatModel');
const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  showtimeId: {
    type: mongoose.Schema.ObjectId,
    ref: 'ShowTimes',
  },
  seatList: [seatSchema],
  totalPrice: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
    // loai bo thuoc tinh createdAt
    select: false,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'userId',
    select: 'email',
  }).populate({
    path: 'showtimeId',
    select: 'ticketPrice idTheater idMovie dateShow',
  });

  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
