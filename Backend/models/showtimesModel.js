const mongoose = require('mongoose');

const showTimesSchema = new mongoose.Schema(
  {
    ticketPrice: { type: Number, trim: true },
    dateShow: { type: Date, trim: true },

    idTheater: {
      type: mongoose.Schema.ObjectId,
      ref: 'Theater',
      required: 'Lịch chiếu phim phải thuộc về một rạp.',
    },
    idMovie: {
      type: mongoose.Schema.ObjectId,
      ref: 'Movie',
      required: 'Lịch chiếu phim phải thuộc về một phi.m',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

showTimesSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'idTheater',
  //   select: 'name type',
  // }).populate({
  //   path: 'idMovie',
  //   select: 'name',
  // });

    this.populate({
      path: 'idTheater',
      select: 'name type',
    })
  next();
});

const ShowTimes = mongoose.model('ShowTimes', showTimesSchema);

module.exports = ShowTimes;
