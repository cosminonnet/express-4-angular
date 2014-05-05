/**
 * Created by cmolea on 02/05/2014.
 */

/**
 * Module dependencies.
 */
var validator = require('validator'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Feature Schema.
 */
var FeatureSchema = new Schema({

    created: {
        type: Date,
        default: Date.now
    },

    title: {
        type: String,
        trim: true
    },

    author: {
        type: String,
        trim: true
    },

    description: {
        type: String,
        default: '',
        trim: true
    }

});

/**
 * Validations.
 */
FeatureSchema.path('title').validate(function(title) {
    return !validator.isNull(title);
}, 'Title cannot be blank');

FeatureSchema.path('author').validate(function(author) {
    return !validator.isNull(author);
}, 'Author cannot be blank');

/**
 * Statics.
 */
FeatureSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id }).exec(cb);
};

mongoose.model('Feature', FeatureSchema);