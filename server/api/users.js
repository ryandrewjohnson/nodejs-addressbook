var User = require('../models').User,
    users;

/**
 * Users API methods
 */
users = {
    get: function (req, res, next) {
        res.status(200).json(req.user);
    },
    add: function (req, res, next) {
        // check if user exists
        User.findOne({username: req.body.username}, function (err, result) {
            if (err) { return next(err); }
            if (result) { return next(new Error('This user already exists.')); }

            // create new user
            var newUser = new User(req.body);
            newUser.save(function (err, user) {
                if (err) { return next(err); }   

                res.status(200).json(user);
            });
        });
    },
    update: function (req, res, next) {
        User.findByIdAndUpdate(req.user.id, req.body, function (err, result) {
            if (err) { return next(err); }   

           res.status(200).json(result); 
        });
    },
    destroy: function (req, res, next) {
        User.findOneAndRemove(req.user.id, function (err, result) {
            if (err) { return next(err); }   

            res.status(200).json(result);
        });
    }
};

module.exports = users;