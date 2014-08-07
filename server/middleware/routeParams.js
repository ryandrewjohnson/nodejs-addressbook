var User    = require('../models').User,
    Contact = require('../models').Contact;


function isValidMongoId (id) {
    return id.match(/^[0-9a-fA-F]{24}$/);
}


module.exports = {
    user: function () {
        return function (req, res, next, id) {
            if (!isValidMongoId(id)) {
                return res.status(400).json({error: 'Invalid user id provided.'});
            }

            User.findById(id, function(err, user) {
                if (err) { return next(err); }   
                if (!user) { return res.status(404).json({error: 'No users found.'}); }

                req.user = user;
                next();
            });
        };
    },
    contact: function () {
        return function (req, res, next, id) {
        if (!isValidMongoId(id)) {
            return res.status(400).json({error: 'Invalid user id provided.'});
        }

        Contact.findById(id, function(err, contact) {
            if (err) { return next(err); }   
            if (!contact) { return res.status(404).json({error: 'No contacts found.'}); }

            req.contact = contact;
            next();
        });
        };
    }
    
};