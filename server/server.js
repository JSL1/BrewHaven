const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const cors = require('cors');
const app = express();

const db = require('./config/db');

//middlewares assignment
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

//catch 404 and send it to error handler
app.use(function(err, req, res, next) {
    next(createError(404));
})

//error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json(
        {
            'success': false,
            'message': err.message
        }
    );
});

//initialize the server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});