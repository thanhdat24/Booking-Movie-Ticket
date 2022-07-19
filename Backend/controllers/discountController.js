const Discount = require('../models/discountModel');
const moment = require('moment');
const factory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getAllDiscount = catchAsync(async (req, res, next) => {
  try {
    let query = Discount.find();
    let result = await query;
    let currentDay = moment().format('YYYY-MM-DDTHH:mm:SS');
    result.map(async (day) => {
      if (
        moment(day.startDate).format('YYYY-MM-DDTHH:mm:SS') > currentDay &&
        day.activeCode !== 'Kết thúc'
      ) {
        day.activeCode = 'Sắp diễn ra';
        await Discount.findByIdAndUpdate(day._id, {
          activeCode: 'Sắp diễn ra',
        });
      } else if (
        moment(day.startDate).format('YYYY-MM-DDTHH:mm:SS') < currentDay &&
        day.activeCode !== 'Kết thúc'
      ) {
        day.activeCode = 'Đang diễn ra';
        await Discount.findByIdAndUpdate(day._id, {
          activeCode: 'Đang diễn ra',
        });
      } else {
        day.activeCode = 'Kết thúc';
        await Discount.findByIdAndUpdate(day._id, {
          activeCode: 'Kết thúc',
        });
      }
    });

    res.status(200).json({
      status: 'success',
      data: result,
      result: result.length,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// exports.getAllDiscount = factory.getAll(Discount);
exports.createDiscount = factory.createOne(Discount);
exports.getDetailDiscount = factory.getOne(Discount);
exports.updateDiscount = factory.updateOne(Discount);
exports.deleteDiscount = factory.deleteOne(Discount);
