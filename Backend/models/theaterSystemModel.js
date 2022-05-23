const mongoose = require('mongoose');
const theaterSystemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A theater system must have a name'],
    },
    logo: {
      type: String,
      required: [true, 'A theater system must have a logo'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
 

theaterSystemSchema.virtual('theatercluster', {
  ref: 'TheaterCluster',
  foreignField: 'idTheaterSystem',
  localField: '_id',
});


const TheaterSystem = mongoose.model('TheaterSystem', theaterSystemSchema);

module.exports = TheaterSystem;
