const mongoose = require('mongoose');
const { seatSchema } = require('./seatModel');
const showTimesSchema = new mongoose.Schema(
  {
    ticketPrice: { type: Number, trim: true },
    dateShow: { type: Date, trim: true },
    idTheaterSystem: {
      type: mongoose.Schema.ObjectId,
      ref: 'TheaterSystem',
    },
    idTheaterCluster: {
      type: mongoose.Schema.ObjectId,
      ref: 'TheaterCluster',
    },
    idTheater: {
      type: mongoose.Schema.ObjectId,
      ref: 'Theater',
      required: 'Lịch chiếu phim phải thuộc về một rạp.',
    },
    idMovie: {
      type: mongoose.Schema.ObjectId,
      ref: 'Movie',
      required: 'Lịch chiếu phim phải thuộc về một phim',
    },

    seatList: [seatSchema],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

showTimesSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'idTheater',
    select: 'name type',
  })
    .populate({
      path: 'idMovie',
      select:
        'name photo banner releaseDate duration nowShowing comingSoon _id trailer description genre',
    })
    .populate({
      path: 'idTheaterSystem',
    })
    .populate({
      path: 'idTheaterCluster',
    });
  next();
});

const ShowTimes = mongoose.model('ShowTimes', showTimesSchema);

module.exports = ShowTimes;
