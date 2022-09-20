const mongoose = require('mongoose');
const theaterSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    type: { type: String, trim: true },
    seatsTotal: { type: Number, default: 160 },
    idTheaterCluster: {
      type: mongoose.Schema.ObjectId,
      ref: 'TheaterCluster',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

theaterSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'idTheaterCluster',
    select: 'name address photo',
  });
  next();
});

const Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;
