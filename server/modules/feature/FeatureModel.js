/**
 * Created by cmolea on 02/05/2014.
 */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Feature Schema
 */
var FeatureSchema = new Schema({

    created: {
        type: Date,
        default: Date.now
    },

    title: {
        type: String,
        default: '',
        trim: true
    },

    author: {
        type: String,
        default: '',
        trim: true
    },

    description: {
        type: String,
        default: '',
        trim: true
    }

});

/**
 * Statics
 */
FeatureSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id }).exec(cb);
};

mongoose.model('Feature', FeatureSchema);