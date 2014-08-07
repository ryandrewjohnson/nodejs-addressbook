var passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy,
    GoogleStrategy  = require('passport-google').Strategy,
    User            = require('../models/').User;


// Login with Username and Password
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            if (password !== user.password) {
                return done(null, false, { message: 'Incorrect username or password.' });   
            }
            
            return done(null, user);
        });
    }
));


// Login with Google
passport.use(new GoogleStrategy({
        returnURL: 'http://localhost:3000/auth/google/return',
        realm: 'http://localhost:3000/'
    },
    function(identifier, profile, done) {
       // try to find user, and if they don't exist create one
       User.findOne({openId: identifier}, function (err, user) {
            // if user found or error found return
            if (err || user.length > 0) { return done(err, user); }

            // no user found create one with Google info
            var newUser = new User({
                openId: identifier,
                username: profile.emails[0].value
            });

            newUser.save(function (err, user) {
                done(err, user);
            });
       });
    }
));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});