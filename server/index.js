var express         = require('express'),
    mongoose        = require('mongoose'),
    bodyParser      = require('body-parser'),
    session         = require('express-session'),
    flash           = require('connect-flash'),
    expressHbs      = require('express3-handlebars'),
    passport        = require('passport'),
    authStrategies  = require('./middleware/authStrategies'),
    errors          = require('./middleware/errors'),
    routes          = require('./routes');


function dbConnect () {
    mongoose.connect('mongodb://localhost/addressbook');

    db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log('db connection success!');
    });
}

function setup (server) {
    dbConnect();
    
    // setup handlebars view engine
    server.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main.hbs'}));
    server.set('view engine', 'hbs');

    // setup middleware 
    server.use(express.static('../public'));
    server.use(bodyParser.urlencoded({ extended: false }))
    server.use(bodyParser.json());
    server.use(session({secret: 'nodejs addressbook', resave: true, saveUninitialized: true}));
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(flash());
    server.use(routes.client());
    server.use(routes.apiBaseUri, routes.api());
    server.use(errors());
}


function startApp () {
    var app = express();

    setup(app);

    app.listen(3000);
}

startApp();


