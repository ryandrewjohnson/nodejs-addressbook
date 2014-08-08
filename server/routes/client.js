var express         = require('express'),
    https           = require('https'),
    passport        = require('passport'),
    google          = require('googleapis'),
    OAuth2          = google.auth.OAuth2,
    parseString     = require('xml2js').parseString,
    api             = require('../api'),
    User            = require('../models').User,
    clientRoutes;

clientRoutes = function (middleware) {
    var router = express.Router(),
        oauth2Client = new OAuth2('821172066107-7q5c8ef6rn6ti44d7ibu5s92tr9p4t6g.apps.googleusercontent.com', 
                                  'sDijuRtiHoYXbNWiC0tKXuj3', 
                                  'http://localhost:3000/import');
    
    router.get('/auth/google', passport.authenticate('google'));
    router.get('/auth/google/return', passport.authenticate('google', { successRedirect: '/',
                                                                        failureRedirect: '/login'}));
    router.get('/import', function (req, res, next) {
        oauth2Client.getToken(req.query.code, function(err, tokens) {
            if(err) { return next(err); }

            oauth2Client.setCredentials(tokens);

            var options = { 
                hostname:'www.google.com', 
                port:443, 
                path:'/m8/feeds/contacts/default/full?v=3.0',
                headers: {
                    'Authorization':'Bearer ' + tokens.access_token,
                    'Content-Type':'application/json',
                    'Content-Length':'0'
                }
            };

            https.get(options, function(response) {
                var xml = '';

                response.on('data', function (chunk) {
                    xml += chunk;
                });

                response.on('end', function () {
                    parseString(xml, function (err, result) {
                        if(err) { return next(err); }

                        console.log('contacts', result.feed.entry);
                        res.render('import', {
                            script: 'import',
                            entries: result.feed.entry,
                            user_id: req.user.id
                        });
                        
                        // res.status(200).json(result.feed.entry);
                    });
                });
            }).on('error', function(err) {
                next(err);
            });
        });
    });

    router.get('/import/complete', function (req, res, next) {
        User.findByIdAndUpdate(req.user.id, {imported: true}, function (err, result) {
            if (err) { return next(err); }   

           res.redirect('/');
        });
    });


    router.get('/', function (req, res, next) {
        if (!req.user) { return res.redirect('/login');}

        var url = oauth2Client.generateAuthUrl({
            access_type: 'online',
            scope: 'https://www.googleapis.com/auth/contacts.readonly'
        });

        User.findById(req.user.id, 'imported', function (err, result) {
            if(err) { return next(err); }

            res.render('index', {
                script: 'index',
                user_id: req.user.id,
                oauthUrl: url,
                imported: result.imported
            });
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