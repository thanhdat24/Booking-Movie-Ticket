const express = require('express');
const authController = require('../controllers/authController');
const showTimeController = require('../controllers/showTimeController');

const router = express.Router();

//Protect all routers after this middleware

// RestrictTo "admin"

router.route('/').get(showTimeController.getAllShowTime);

// router.use(authController.protect);

router
  .route('/')
  .post(authController.restrictTo('admin'), showTimeController.createShowTime);

// router.use(authController.restrictTo('admin'));

router
  .route('/:id')
  .get(showTimeController.getDetailShowTime)
  .patch(authController.restrictTo('admin'), showTimeController.updateShowTime)
  .delete(
    authController.restrictTo('admin'),
    showTimeController.deleteShowTime
  );
module.exports = router;
