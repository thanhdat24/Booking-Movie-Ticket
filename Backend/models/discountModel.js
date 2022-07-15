const mongoose = require('mongoose');
const discountSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A discount must have a title'],
    },
    price: {
      type: String,
      required: [true, 'A discount must have a price'],
    },
    percent: {
      type: String,
    },
    miniPrice: {
      type: String,
    },
    code: {
      type: String,
      required: [true, 'A discount must have a code'],
    },
    startDate: {
      type: Date,
      required: [true, 'A discount must have a startDate'],
    },
    expiryDate: {
      type: Date,
      required: [true, 'A discount must have a expiryDate'],
    },
    activePublic: {
      type: Boolean,
      default: false,
    },
    activeCode: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Discount = mongoose.model('Discount', discountSchema);
module.exports = Discount;
