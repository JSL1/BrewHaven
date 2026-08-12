const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Import database connection
require('./config/db');

// Middlewares assignment
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// Mounting routers
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var orderRouter = require('./routes/orders');
var itemRouter = require('./routes/items');
var userRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/orders', orderRouter);
app.use('/items', itemRouter);
app.use('/users', userRouter);

// Catch 404 and send it to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        'success': false,
        'message': err.message
    });
});

// Initialize the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server running at http://localhost:' + PORT + '/');
});