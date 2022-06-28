const Discount = require('../models/discountModel');

const factory = require('../controllers/handlerFactory');

exports.getAllDiscount = factory.getAll(Discount);
exports.createDiscount = factory.createOne(Discount);
exports.getDetailDiscount = factory.getOne(Discount);
exports.updateDiscount = factory.updateOne(Discount);
exports.deleteDiscount = factory.deleteOne(Discount);
