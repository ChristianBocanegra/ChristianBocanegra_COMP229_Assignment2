var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('../routes/index');
var userRouter = require('../routes/user');
var contactsRouter = require('../routes/contacts');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/contacts', contactsRouter);
app.use('/user', userRouter);


app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {

  res.status(err.status || 500);
  res.json({ 
    success: false,
    message: err.message
   });
  });

module.exports = app;