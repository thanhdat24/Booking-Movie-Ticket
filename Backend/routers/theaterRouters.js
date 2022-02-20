const express = require('express');
const authController = require('../controllers/authController');
const theaterController = require('../controllers/theaterController');

const router = express.Router();

//Protect all routers after this middleware
router.use(authController.protect);

// RestrictTo "admin"
router.use(authController.restrictTo('admin'));

router.route('/').get(theaterController.getAllTheater);

router.route('/').post(theaterController.createTheater);

router
  .route('/:id')
  .get(theaterController.getDetailTheater)
  .patch(theaterController.updateTheater)
  .delete(theaterController.deleteTheater);
module.exports = router;
