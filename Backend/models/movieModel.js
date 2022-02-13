const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A movie must have a name'],
  },
  alias: {
    type: String,
    required: [true, 'A movie must have a alias'],
  },
  trailer: {
    type: String,
    required: [true, 'A movie must have a trailer'],
  },
  photo: {
    type: String,
    required: [true, 'A movie must have a photo'],
  },
  description: {
    type: String,
    required: [true, 'A movie must have a description'],
  },
  releaseDate: {
    type: Date,
    default: Date.now,
  },
  nowShowing: {
    type: Boolean,
    enum: [true, false],
    default: null,
  },
  comingSoon: {
    type: Boolean,
    enum: [true, false],
    default: null,
  },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
