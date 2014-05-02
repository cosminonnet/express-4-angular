/**
 * Created by cmolea on 02/05/2014.
 */

/**
 * Module dependencies.
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');

/**
 * Initializing system variables.
 */
var config = require('./Database');
mongoose.connect(config.url);

/**
 * Initializing application.
 */
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Initializing models and routes.
 */
require('../modules/feature/FeatureModel');
require('../modules/feature/FeatureRoutes')(app);

var users = require('../routes/users');
app.use('/users', users);

/**
 * Error handlers.
 */
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.send(err.status || 500);
});

/**
 * Module export.
 */
module.exports = app;