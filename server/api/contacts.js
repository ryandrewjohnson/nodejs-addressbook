var Contact = require('../models').Contact,
    contacts;

/**
 * Contacts API methods
 */
contacts = {
    getAll: function (req, res, next) {
        Contact.find({_user: req.user.id}, function (err, result) {
            if (err) { return next(err); }

            res.status(200).json(result);
        });
    },
    add: function (req, res, next) {
        var data = req.body;

        // add userId to data
        data._user = req.user.id;

        var contact = new Contact(req.body);

        contact.save(function (err, result) {
            if (err) { return next(err); }   

            res.status(200).json(result);
        });
    },
    update: function (req, res, next) {
        Contact.findByIdAndUpdate(req.contact.id, req.body, function (err, result) {
            if (err) { return next(err); }   

           res.status(200).json(result); 
        });
    },
    destroy: function (req, res, next) {
        Contact.findOneAndRemove(req.contact.id, function (err, result) {
            if (err) { return next(err); }   

            res.status(200).json(result);
        });
    }
};


module.exports = contacts;
