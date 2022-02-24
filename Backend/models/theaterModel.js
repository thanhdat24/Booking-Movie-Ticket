const mongoose = require('mongoose');
const theaterSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  type: { type: String, trim: true },
  seatsTotal: { type: Number, default: 160 },
});

const Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;
