var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    db = require('./app/helpers/db'),
    passport = require('passport'),
    passportConfig = require('./app/config/passport');

// configure app to use bodyParser for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// wire in controllers
app.use('/api', require('./app/controllers/movies'));
app.use('/api', require('./app/controllers/movieOrders'));
app.use('/api', require('./app/controllers/collections'));

// OAuth2 stuff
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);
app.use('/', require('./app/controllers/auth'));
app.use('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


// Connect to Mongo on start
db.connect('mongodb://localhost:27017/movieCollection', function (err) {
    if (err) {
        console.log('Unable to connect to Mongo.');
        process.exit(1)
    } else {
        app.listen(3000, function () {
            console.log('Listening on port 3000...');
        })
    }
});