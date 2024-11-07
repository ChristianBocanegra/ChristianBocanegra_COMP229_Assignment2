var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var contactsRouter = require('../routes/contacts');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);


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