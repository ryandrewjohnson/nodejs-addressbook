var mongoose        = require('mongoose'),
    ContactSchema   = require('../data/schemas').contact;


module.exports = {
    Contact: mongoose.model('Contact', ContactSchema)
};