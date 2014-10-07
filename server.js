/**
 * ==============================================
 * Module dependencies.
 * ==============================================
 */
var express = require('express'),
    path = require('path'),
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
var config = require('./server/configs/Database');
var address = process.env.MONGODB_PORT_27017_TCP_ADDR || 'localhost';
var port = process.env.MONGODB_PORT_27017_TCP_PORT || 27017;
mongoose.connect("mongodb://" + address + ":" + port + "/" + config.databaseName);

/**
 * ==============================================
 * Initializing application.
 * ==============================================
 */
var app = express();

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

require('./server/modules/feature/FeatureRoutes')(router);

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
 * Start application.
 * ==============================================
 */
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('--------------------------------------------------');
    console.log('Express server listening on port: ' + server.address().port);
    console.log('Node environment: ' + process.env.NODE_ENV);
});
