const express = require('express');
const authController = require('../controllers/authController');
const seatController = require('../controllers/seatController');

const router = express.Router();

//Protect all routers after this middleware
router.use(authController.protect);

// RestrictTo "admin"
router.use(authController.restrictTo('admin'));

router.route('/').get(seatController.getAllSeat);

router.route('/').post(seatController.createSeat);

router
  .route('/:id')
  .get(seatController.getDetailSeat)
  .patch(seatController.updateSeat)
  .delete(seatController.deleteSeat);
module.exports = router;
