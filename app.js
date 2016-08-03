var express = require('express')
    , app = express();

var db = require('./helpers/db');

//app.use('/comments', require('./controllers/comments'));
//app.use('/users', require('./controllers/users'));

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