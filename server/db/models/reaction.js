'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

var schema = new mongoose.Schema({
    reaction: {type: String, required: true},
    image: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'Image'
    }
});


mongoose.model('Reaction', schema);