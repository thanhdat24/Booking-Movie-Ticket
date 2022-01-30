const Review = require('../models/reviewModel');
const factory = require('../controllers/handlerFactory');
// const catchAsync = require('../utils/catchAsync');

exports.setTourUserId = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
};

exports.getAllReviews = factory.getAll(Review)
exports.getDetailReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
