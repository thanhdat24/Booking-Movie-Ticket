const express = require('express');
const authController = require('../controllers/authController');
const movieController = require('../controllers/movieController');

const router = express.Router();

//Protect all routers after this middleware

router.post('/search-movie', movieController.searchMovie);


router.route('/:id').get(movieController.getDetailMovie);
router.route('/').get(movieController.getAllMovie);

router
  .route('/getMovieShowtimeInfo/:id')
  .get(movieController.getMovieShowtimeInfo);

router.use(authController.protect);

// RestrictTo "admin"
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .post(movieController.uploadMoviePhoto, movieController.createMovie);

router
  .route('/:id')
  .patch(
    authController.protect,
    movieController.uploadMoviePhoto,
    movieController.updateMovie
  )
  .delete(movieController.deleteMovie);

module.exports = router;
