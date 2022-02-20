const ShowTimes = require('../models/showTimesModel');

const factory = require('../controllers/handlerFactory');

exports.getAllShowTimes = factory.getAll(ShowTimes);
exports.createShowTimes = factory.createOne(ShowTimes);
exports.getDetailShowTimes = factory.getOne(ShowTimes);
exports.updateShowTimes = factory.updateOne(ShowTimes);
exports.deleteShowTimes = factory.deleteOne(ShowTimes);
