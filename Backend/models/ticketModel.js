const mongoose = require('mongoose');
const { seatSchema } = require('./seatModel');
const ticketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    idShowtime: {
      type: mongoose.Schema.ObjectId,
      ref: 'ShowTimes',
    },
    seatList: [seatSchema],
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isUnRead: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ticketSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'userId',
    select: 'email fullName photo',
  }).populate({
    path: 'idShowtime',
  });

  next();
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
