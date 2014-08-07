var mongoose        = require('mongoose'),
    Schema          = mongoose.Schema,
    userSchema      = require('./user'),
    contactSchema   = require('./contact');

module.exports = {
    user: new Schema(userSchema),
    contact: new Schema(contactSchema),
};
     