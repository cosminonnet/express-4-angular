/**
 * Created by cmolea on 02/05/2014.
 */

'use strict';

var FeatureController = require('./FeatureController'),
    SameOrigin = require('../../middlewares/SameOrigin');

module.exports = function(app) {

    // Apply middlewares
    app.all('/api/feature*', SameOrigin);

    // Setup the routes
    app.get('/api/feature/:id?', FeatureController.find);
    app.post('/api/feature', FeatureController.create);
    app.put('/api/feature/:id?', FeatureController.update);
    app.del('/api/feature/:id?', FeatureController.destroy);

    // Load the object identified by <:id>
    app.param('id', FeatureController.load);

};