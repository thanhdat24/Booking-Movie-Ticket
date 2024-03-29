const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A movie must have a name'],
    },
    genre: { type: String, required: [true, 'A movie must have a genre'] },
    trailer: {
      type: String,
      required: [true, 'A movie must have a trailer'],
    },
    photo: {
      type: String,
      required: [true, 'A movie must have a photo'],
    },
    banner: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, 'A movie must have a description'],
    },
    duration: { type: String, default: '' },
    releaseDate: {
      type: Date,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

movieSchema.virtual('showtimes', {
  ref: 'ShowTimes',
  foreignField: 'idMovie',
  localField: '_id',
});

movieSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'movieId',
  localField: '_id',
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
