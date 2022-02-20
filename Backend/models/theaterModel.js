const mongoose = require('mongoose');
const theaterSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  type: { type: String, trim: true },
});

const Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;
