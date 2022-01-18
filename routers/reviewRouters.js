const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const router = express.Router({ mergeParams: true });

//Protect all routers after this middleware
router.use(authController.protect);

router.route('/').get(reviewController.getAllReviews).post(
  authController.restrictTo('user'),
  reviewController.createReview
);

router
  .route('/:id')
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.setTourUserId,
    reviewController.deleteReview
  )
  .get(reviewController.getDetailReview);

module.exports = router;
