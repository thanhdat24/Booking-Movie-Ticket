const mongoose = require('mongoose');

const theaterClusterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A theater cluster must have a name'],
    },
    address: {
      type: String,
      required: [true, 'A theater cluster must have a address'],
    },
    photo: {
      type: String,
    },
    idTheaterSystem: {
      type: mongoose.Schema.ObjectId,
      ref: 'TheaterSystem',
      required: 'Mỗi cụm rạp phải thuộc về một hệ thống rạp',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

theaterClusterSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'idTheaterSystem',
    select: 'name logo',
  });
  next();
});

theaterClusterSchema.virtual('theaterList', {
  ref: 'Theater',
  foreignField: 'idTheaterCluster',
  localField: '_id',
});

const TheaterCluster = mongoose.model('TheaterCluster', theaterClusterSchema);

module.exports = TheaterCluster;
