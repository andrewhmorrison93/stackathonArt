'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

var schema = new mongoose.Schema({
    mailer: {
        auth: {
            user: 'test@example.com',
            // pass: 'secret',
        },
        defaultFromAddress: 'First Last <test@examle.com>'
    }
});

mongoose.model('Mailer', schema);
