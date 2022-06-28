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
    description: {
      type: String,
      required: [true, 'A discount must have a description'],
    },
    expiryDate: {
      type: String,
      required: [true, 'A discount must have a expiryDate'],
    },
    // active: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Discount = mongoose.model('Discount', discountSchema);
module.exports = Discount;
