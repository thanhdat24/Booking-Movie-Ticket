const express = require('express');
const authController = require('../controllers/authController');
const ticketController = require('../controllers/ticketController');

const router = express.Router();

//Protect all routers after this middleware
router.use(authController.protect);

router.route('/').post(ticketController.createTicket);
// RestrictTo "admin"


router.route('/').get(ticketController.getAllTicket);

router.use(authController.restrictTo('admin'));

router
  .route('/:id')
  .get(ticketController.getDetailTicket)
  .patch(ticketController.updateTicket)
  .delete(ticketController.deleteTicket);
module.exports = router;
