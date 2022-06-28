const express = require('express');
const authController = require('../controllers/authController');
const discountController = require('../controllers/discountController');

const router = express.Router();

//Protect all routers after this middleware
router.use(authController.protect);

// RestrictTo "admin"
router.use(authController.restrictTo('admin'));

router.route('/').get(discountController.getAllDiscount);

router.route('/').post(discountController.createDiscount);

router
  .route('/:id')
  .get(discountController.getDetailDiscount)
  .patch(discountController.updateDiscount)
  .delete(discountController.deleteDiscount);
module.exports = router;
