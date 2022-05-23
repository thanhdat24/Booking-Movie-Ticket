const TheaterCluster = require('../models/theaterClusterModel');
const factory = require('../controllers/handlerFactory');

exports.getAllTheaterCluster = factory.getAll(TheaterCluster);
exports.createTheaterCluster = factory.createOne(TheaterCluster);
exports.getDetailTheaterCluster = factory.getOne(TheaterCluster);
exports.updateTheaterCluster = factory.updateOne(TheaterCluster);
exports.deleteTheaterCluster = factory.deleteOne(TheaterCluster);
