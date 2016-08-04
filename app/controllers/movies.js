var express = require('express'),
    router = express.Router(),
    Movie = require('../models/movie');

/**
 * Movies API
 */
router.route('/movie')
    .get(function (req, res) {
        // query string parsing
        var ids = req.query.id;
        if (ids && ids.constructor == Array) {
            // looking for multiple IDs
            Movie.findByIds(ids, function (err, docs) {
                if (err) {
                    res.json({
                        message: 'error',
                        error: err
                    });
                } else {
                    res.json(docs);
                }
            });
        } else {
            // return all movies
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
        }
    })
    .post(function (req, res) {
        console.log(req);
        var newMovie = req.body;
        Movie.save(newMovie, function (err, doc) {
            if (err) {
                res.json({
                    message: 'error',
                    error: err
                });
            } else {
                res.json(doc);
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
        res.json({message: 'PUT'});
    })
    .delete(function (req, res) {
        res.json({message: 'DELETE'});
    });

module.exports = router;
