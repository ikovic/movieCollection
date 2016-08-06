var express = require('express'),
    router = express.Router(),
    Movie = require('../models/movie'),
    resHelper = require('../helpers/responseHelper');

/**
 * Movies API
 */
router.route('/movieOrder')
    .post(function (req, res) {
        var newOrder = req.body,
            newMovie = null;

        console.log(newOrder);

        if (newOrder.imdbId) {
            Movie.addByImdbId(newOrder.imdbId, function (movie) {
                Movie.save(movie, function (err, doc) {
                    resHelper.handleApiResponse(err, doc, res);
                });
            });
        } else {
            console.log('NYI');
            res.json({error: 'NYI'});
        }
    });

module.exports = router;
