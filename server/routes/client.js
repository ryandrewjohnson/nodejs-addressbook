var express         = require('express'),
    passport        = require('passport'),
    api             = require('../api'),
    clientRoutes;


clientRoutes = function (middleware) {
    var router = express.Router();
    
    router.get('/auth/google', passport.authenticate('google'));
    router.get('/auth/google/return', passport.authenticate('google', { successRedirect: '/',
                                                                        failureRedirect: '/login'}));

    router.get('/', function (req, res, next) {
        if (!req.user) { return res.redirect('/login');}

        res.render('index', {
            script: 'index',
            user_id: req.user.id
        });
    });

    router.get('/register', function (req, res) {
        res.render('register', {script: 'register'});
    });

    router.get('/login', function (req, res, next) {
        if (req.user) { return res.redirect('/'); }

        if (req.query.registered) {
            req.flash('registered', 'Success! Now you can login with your email and password!');
        }

        res.render('login', req.flash());
    });

    router.post('/login',
        passport.authenticate('local', { successRedirect: '/',
                                         failureRedirect: '/login',
                                         failureFlash: true })
    );

    router.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    return router;
};


module.exports = clientRoutes;