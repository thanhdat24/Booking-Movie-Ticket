const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

// const passport = require('passport');

// const successLoginURL = 'http://localhost:3000';
// const errorLoginURL = 'http://localhost:3000/login';

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/sendOtp', authController.sendOtp);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// router.get('/login/success', (req, res) => {
//   console.log('req.user', req.user);
//   if (req.user) {
//     res.status(200).json({
//       status: 'success',
//       user: req.user,
//       // cookies: req.cookies,
//     });
//   }
// });

// router.get(
//   '/login/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// router.get(
//   '/google/callback',
//   passport.authenticate('google', {
//     failureMessage: 'Cannot login to Google, please try again later!',
//     successRedirect: successLoginURL,
//     failureRedirect: errorLoginURL,
//   }),
//   (req, res) => {
//     console.log('User:', req.user);
//     res.send('Success');
//   }
// );

// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect(successLoginURL);
// });

//Protect all routers after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/getMe', userController.getMe, userController.getDetailUser);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);

// RestrictTo "admin"
// router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(authController.restrictTo('admin'), userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getDetailUser)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    userController.uploadUserPhoto,
    userController.updateUser
  )
  .delete(authController.protect, userController.deleteUser);
module.exports = router;
