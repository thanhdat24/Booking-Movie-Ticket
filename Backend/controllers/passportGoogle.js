const passport = require('passport');
const User = require('../models/userModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

const GOOGLE_CALLBACK_URL =
  'http://127.0.0.1:8080/api/v1/users/google/callback';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    function (req, res, accessToken, refreshToken, profile, cb) {
      console.log('profile', profile);
      User.findOne(
        {
          googleId: profile.id,
        },
        function (err, user) {
          if (err) {
            return cb(err);
          }
          //No user was found... so create a new user with values from Facebook (all the profile. stuff)
          if (!user) {
            user = new User({
              phoneNumber: '',
              gender: '',
              dateOfBirth: '',
              role: 'user',
              fullName: profile.displayName,
              email: profile.emails[0].value,
              photo: profile.photos[0].value,
              googleId: profile.id,
            });
            user.save(function (err) {
              if (err) console.log(err);
              return cb(err, user);
            });
          } else {
            //found user. Return
            return cb(err, user);
          }
        }
      );
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log('Serializing user:', user);
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findOne({ where: { id } }).catch((err) => {
    console.log('Error deserializing', err);
    cb(err, null);
  });

  console.log('DeSerialized user', user);

  if (user) cb(null, user);
});
