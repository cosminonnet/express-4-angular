/**
 * Created by cmolea on 02/05/2014.
 */

/**
 * ==============================================
 * Module dependencies.
 * ==============================================
 */
var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    http = require('http'),
    mongoose = require('mongoose'),
    expressValidator = require('express-validator');

/**
 * ==============================================
 * Initializing system variables.
 * ==============================================
 */
var config = require('./Database');
mongoose.connect(config.url);

/**
 * ==============================================
 * Initializing application.
 * ==============================================
 */
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());
app.use(cookieParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * ==============================================
 * Initializing models and routes.
 * ==============================================
 */
var router = express.Router();

require('../modules/feature/FeatureRoutes')(router);

app.use('/api', router);

/**
 * ==============================================
 * Error handlers.
 * ==============================================
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
 * ==============================================
 * Module export.
 * ==============================================
 */
module.exports = app;