var express = require('express'),
    router = express.Router(),
    Movie = require('../models/movie');

router.get('/movie', function (req, res) {
    Movie.findAll(function (err, docs) {
        if (err) {
            res.json({
                message: 'error',
                error: err
            });
        } else {
            res.json(docs);
        }
    });
});

router.route('/movie/:movieId')
    .get(function (req, res) {
        Movie.findById(req.params.movieId, function (err, doc) {
            if (err) {
                res.json({
                    message: 'error',
                    error: err
                });
            } else {
                res.json(doc);
            }
        });
    })
    .put(function (req, res) {

    });

module.exports = router;
