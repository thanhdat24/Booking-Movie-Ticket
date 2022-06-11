const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const router = express.Router({ mergeParams: true });

//Protect all routers after this middleware
// router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(authController.protect, reviewController.createReview);

router
  .route('/:id')
  .get(reviewController.getDetailReview)
  .delete(authController.protect, reviewController.deleteReview)
  .patch(authController.protect, reviewController.likeReview);

module.exports = router;
