const express = require('express');
const authController = require('../controllers/authController');
const showTimesController = require('../controllers/showTimesController');

const router = express.Router();

//Protect all routers after this middleware
router.use(authController.protect);

// RestrictTo "admin"
router.use(authController.restrictTo('admin'));

router.route('/').get(showTimesController.getAllShowTimes);

router.route('/').post(showTimesController.createShowTimes);

router
  .route('/:id')
  .get(showTimesController.getDetailShowTimes)
  .patch(showTimesController.updateShowTimes)
  .delete(showTimesController.deleteShowTimes);
module.exports = router;
