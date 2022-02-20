const Theater = require('../models/theaterModel');
const factory = require('../controllers/handlerFactory');


exports.getAllTheater= factory.getAll(Theater);
exports.createTheater= factory.createOne(Theater);
exports.getDetailTheater= factory.getOne(Theater);
exports.updateTheater= factory.updateOne(Theater);
exports.deleteTheater= factory.deleteOne(Theater);
