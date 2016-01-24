'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

var schema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    }
});

mongoose.model('Image', schema);
