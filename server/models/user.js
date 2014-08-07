var mongoose     = require('mongoose'),
    UserSchema   = require('../data/schemas').user;


module.exports = {
    User: mongoose.model('User', UserSchema)
};