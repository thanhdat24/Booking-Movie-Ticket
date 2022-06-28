const path = require('path');
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRoutes = require('./routers/tourRouters');
const userRoutes = require('./routers/userRouters');
const movieRoutes = require('./routers/movieRouters');
const theaterRoutes = require('./routers/theaterRouters');
const showtimeRoutes = require('./routers/showtimeRouters');
const reviewRouters = require('./routers/reviewRouters');
const ticketRouters = require('./routers/ticketRouters');
const theaterSystemRouters = require('./routers/theaterSystemRouters');
const theaterClusterRouters = require('./routers/theaterClusterRouters');
const discountRouters = require('./routers/discountRouters');

const seatRouters = require('./routers/seatRouters');
const swaggerDocument = require('./swagger/swagger.json');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();

// const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Serving static files
// const publicPathDirectory = path.join(__dirname, 'public')
app.use(express.static(path.join(__dirname, './public')));
// app.use(express.static(`${__dirname}/public`));

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

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 3) Router

app.use(cors());
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/reviews', reviewRouters);
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/theaters', theaterRoutes);
app.use('/api/v1/showtimes', showtimeRoutes);
app.use('/api/v1/seats', seatRouters);
app.use('/api/v1/tickets', ticketRouters);
app.use('/api/v1/theatersystem', theaterSystemRouters);
app.use('/api/v1/theatercluster', theaterClusterRouters);
app.use('/api/v1/discounts', discountRouters);

// trả về đường dẫn not found
app.all('*', (req, res, next) => {
  next(new AppError(`Can'n find ${req.originalUrl} on this sever!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
