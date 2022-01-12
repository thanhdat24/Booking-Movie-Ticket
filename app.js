const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRoutes = require('./routers/tourRouters');
const userRoutes = require('./routers/userRouters');
const rateLimit = require('express-rate-limit');
const app = express();

// 1) Global Middleware
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windows: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour!',
});
app.use('/api', limiter);

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) Router
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

// trả về đường dẫn not found
app.all('*', (req, res, next) => {
  next(new AppError(`Can'n find ${req.originalUrl} on this sever!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
