const express = require('express');
const authController = require('../controllers/authController');
const theaterClusterController = require('../controllers/theaterClusterController');

const router = express.Router();

//Protect all routers after this middleware
router.use(authController.protect);

// RestrictTo "admin"
router.use(authController.restrictTo('admin'));

router.route('/').get(theaterClusterController.getAllTheaterCluster);

router.route('/').post(theaterClusterController.createTheaterCluster);

router
  .route('/:id')
  .get(theaterClusterController.getDetailTheaterCluster)
  .patch(
    theaterClusterController.uploadTheaterCluster
    ,theaterClusterController.updateTheaterCluster
  )
  .delete(theaterClusterController.deleteTheaterCluster);
module.exports = router;
