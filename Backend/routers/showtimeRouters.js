const express = require('express');
const authController = require('../controllers/authController');
const showTimeController = require('../controllers/showTimeController');

const router = express.Router();

//Protect all routers after this middleware
router.use(authController.protect);

// RestrictTo "admin"
router.use(authController.restrictTo('admin'));

router.route('/').get(showTimeController.getAllShowTime);

router.route('/').post(showTimeController.createShowTime);

router
  .route('/:id')
  .get(showTimeController.getDetailShowTime)
  .patch(showTimeController.updateShowTime)
  .delete(showTimeController.deleteShowTime);
module.exports = router;
