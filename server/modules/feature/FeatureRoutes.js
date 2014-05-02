/**
 * Created by cmolea on 02/05/2014.
 */

'use strict';

var FeatureController = require('./FeatureController'),
    SameOrigin = require('../../middlewares/SameOrigin');

module.exports = function(router) {

    // Apply middlewares
    router.all('/feature*', SameOrigin);

    // Setup the routes
    router.get('/feature/:id?', FeatureController.find);
    router.post('/feature', FeatureController.create);
    router.put('/feature/:id?', FeatureController.update);
    router.delete('/feature/:id?', FeatureController.destroy);

    // Load the object identified by <:id>
    router.param('id', FeatureController.load);

};