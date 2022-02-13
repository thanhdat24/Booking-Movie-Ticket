const Movie = require('../models/movieModel');
const factory = require('../controllers/handlerFactory');

exports.getAllMovie = factory.getAll(Movie);

exports.createMovie = factory.createOne(Movie);
exports.getDetailMovie = factory.getOne(Movie);
exports.updateMovie = factory.updateOne(Movie);
exports.deleteMovie = factory.deleteOne(Movie);