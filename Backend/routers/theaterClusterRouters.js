const express = require('express');
const authController = require('../controllers/authController');
const theaterClusterController = require('../controllers/theaterClusterController');

const router = express.Router();


router.route('/').get(theaterClusterController.getAllTheaterCluster);

router
  .route('/getMovieInfoTheaterCluster/:id')
  .get(theaterClusterController.getMovieInfoTheaterCluster);

//Protect all routers after this middleware
router.use(authController.protect);

// RestrictTo "admin"
router.use(authController.restrictTo('admin'));



router.route('/').post(theaterClusterController.createTheaterCluster);

router
  .route('/:id')
  .get(theaterClusterController.getDetailTheaterCluster)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    theaterClusterController.uploadTheaterCluster,
    theaterClusterController.updateTheaterCluster
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    theaterClusterController.deleteTheaterCluster
  );
module.exports = router;
