var express = require('express'),
    router = express.Router(),
    Movie = require('../models/movie'),
    resHelper = require('../helpers/responseHelper');


/**
 * Movies API
 */
router.route('/movie')
    .get(function (req, res) {
        // query string parsing
        var ids = req.query.id;
        var title = req.query.title;
        if (ids && ids.constructor == Array) {
            // looking for multiple IDs
            Movie.findByIds(ids, function (err, docs) {
                resHelper.handleApiResponse(err, docs, res);
            });
        } else if (ids) {
            // a single ID received, return array
            Movie.findById(ids, function (err, doc) {
                var wrapper = [];
                wrapper.push(doc);
                resHelper.handleApiResponse(err, wrapper, res);
            });
        } else if (title && title.length) {
            // searching by title
            Movie.searchByTitle(title, function (docs) {
                resHelper.handleApiResponse(null, docs, res);
            });
        } else {
            // return all movies
            Movie.findAll(function (err, docs) {
                resHelper.handleApiResponse(err, docs, res);
            });
        }
    })
    .post(function (req, res) {
        var newMovie = req.body;
        Movie.save(newMovie, function (err, doc) {
            resHelper.handleApiResponse(err, doc, res);
        });
    });

router.route('/movie/:movieId')
    .get(function (req, res) {
        Movie.findById(req.params.movieId, function (err, doc) {
            resHelper.handleApiResponse(err, doc, res);
        });
    })
    .put(function (req, res) {
        res.json({message: 'PUT'});
    })
    .delete(function (req, res) {
        res.json({message: 'DELETE'});
    });

module.exports = router;
