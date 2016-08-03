var express = require('express'),
    router = express.Router(),
    Movie = require('../models/movie');

router.get('/movie', function (req, res) {
    Movie.all(function (err, docs) {
        res.json({movies: docs});
    });
});

module.exports = router;
