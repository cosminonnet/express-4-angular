/**
 * Created by cmolea on 02/05/2014.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Feature = mongoose.model('Feature'),
    _ = require('lodash');

module.exports = {

    /**
     * Load.
     */
    load: function(req, res, next, id) {
        Feature.load(id, function(err, feature) {
            // An error occurred
            if (err) return res.send(500);

            // Object not found
            if (!feature) return res.send(404);

            // Add the object to the request
            req.feature = feature;
            next();
        });
    },

    /**
     * Find.
     */
    find: function(req, res) {
        var feature = req.feature;

        if (feature) {
            return res.json(feature);
        } else {
            Feature.find().exec(function (err, list) {
                if (err) return res.send(500);
                return res.json(list);
            });
        }
    },

    /**
     * Create.
     */
    create: function(req, res) {
        var feature = new Feature(req.body);

        feature.save(function(err) {
            if (err) return res.send(500);
            return res.json(feature);
        });
    },

    /**
     * Update.
     */
    update: function(req, res) {
        var feature = _.extend(req.feature, req.body);

        feature.save(function(err) {
            if (err) return res.send(500);
            return res.json(feature);
        });
    },

    /**
     * Destroy.
     */
    destroy: function(req, res) {
        var feature = req.feature;

        if (feature) {
            feature.remove(function(err) {
                if (err) return res.send(500);
                return res.json(feature);
            });
        } else {
            Feature.find().remove(function (err, removedCount) {
                if (err) return res.send(500);
                return res.json({
                    count : removedCount
                });
            });
        }
    }

}