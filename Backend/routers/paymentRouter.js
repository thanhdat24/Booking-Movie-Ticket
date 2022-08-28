const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/paymentController');

router.route('/create').post(paymentController.createPayment);
router.route('/query').post(paymentController.queryPayment);

module.exports = router;
