const express = require('express');
const authController = require('../controllers/authController');
const theaterSystemController = require('../controllers/theaterSystemController');

const router = express.Router();

router
  .route('/getInfoShowtimeOfTheaterSystem')
  .get(theaterSystemController.getInfoShowtimeOfTheaterSystem);

//Protect all routers after this middleware
router.use(authController.protect);

// RestrictTo "admin"
router.use(authController.restrictTo('admin'));

router.route('/').get(theaterSystemController.getAllTheaterSystem);

router
  .route('/')
  .post(
    theaterSystemController.uploadTheaterSystem,
    theaterSystemController.createTheaterSystem
  );

router
  .route('/:id')
  .get(theaterSystemController.getDetailTheaterSystem)
  .patch(theaterSystemController.updateTheaterSystem)
  .delete(theaterSystemController.deleteTheaterSystem);
module.exports = router;
