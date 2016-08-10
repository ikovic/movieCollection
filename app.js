var express = require('express'),
    app = express(),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    db = require('./app/helpers/db'),
    passport = require('passport'),
    passportConfig = require('./app/config/passport'),
    config = require('./app/config/config');

// configure app to use bodyParser for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// required for passport session
app.use(session({
    secret: 'secrettexthere',
    saveUninitialized: true,
    resave: true
}));

// OAuth2 stuff
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// wire in controllers
app.use('/auth', require('./app/controllers/auth'));
app.use('/api', require('./app/controllers/movies'));
app.use('/api', require('./app/controllers/movieOrders'));
app.use('/api', require('./app/controllers/collections'));


// Connect to Mongo on start
db.connect(config.mongoUrl, function (err) {
    if (err) {
        console.log('Unable to connect to Mongo.');
        process.exit(1)
    } else {
        app.listen(config.port, function () {
            console.log('Listening on port 3000...');
        })
    }
});