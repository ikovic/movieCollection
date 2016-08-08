var express = require('express'),
    router = express.Router(),
    Movie = require('../models/movie'),
    resHelper = require('../helpers/responseHelper');

/**
 * Movies API
 */
router.route('/movieOrder')
    .post(function (req, res) {
        var imdbId = req.body.imdbId;

        // check if the movie is already in the DB
        Movie.findByImdbId(imdbId, function (err, doc) {
            if (!err && doc) {
                // movie exists, return that
                res.json(doc);
            } else {
                // get the movie from OMDb
                Movie.fetchByImdbId(imdbId, function (movie) {
                    Movie.save(movie, function (err, doc) {
                        if (!err && doc) {
                            movie._id = doc.insertedId;
                            resHelper.handleApiResponse(err, movie, res);
                        } else {
                            resHelper.handleApiResponse(err, doc, res);
                        }
                    });
                });
            }
        });

    });

module.exports = router;
