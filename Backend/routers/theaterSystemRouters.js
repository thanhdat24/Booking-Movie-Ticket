const express = require('express');
const authController = require('../controllers/authController');
const theaterSystemController = require('../controllers/theaterSystemController');

const router = express.Router();


router.route('/').get(theaterSystemController.getAllTheaterSystem);
router
  .route('/getInfoShowtimeOfTheaterSystem')
  .get(theaterSystemController.getInfoShowtimeOfTheaterSystem);

router.use(authController.protect);


//Protect all routers after this middleware

// RestrictTo "admin"
router.use(authController.restrictTo('admin'));


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
