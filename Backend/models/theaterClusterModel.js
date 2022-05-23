const mongoose = require('mongoose');
const theaterClusterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A theater cluster must have a name'],
  },
  address: {
    type: String,
    required: [true, 'A theater cluster must have a logo'],
  },
  idTheaterSystem: {
    type: mongoose.Schema.ObjectId,
    ref: 'TheaterSystem',
    required: 'Mỗi cụm rạp phải thuộc về một hệ thống rạp',
  },
});

const TheaterCluster = mongoose.model('TheaterCluster', theaterClusterSchema);

module.exports = TheaterCluster;
