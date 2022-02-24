const express = require('express');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

//Protect all routers after this middleware
router.use(authController.protect);

router.route('/').post(bookingController.createBooking);
// RestrictTo "admin"
router.use(authController.restrictTo('admin'));

router.route('/').get(bookingController.getAllBooking);

router
  .route('/:id')
  .get(bookingController.getDetailBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);
module.exports = router;
