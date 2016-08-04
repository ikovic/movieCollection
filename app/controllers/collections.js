var express = require('express'),
    router = express.Router(),
    Collection = require('../models/collection'),
    resHelper = require('../helpers/responseHelper');

/**
 * Collections API
 */
router.route('/collection')
    .get(function (req, res) {
        Collection.findAll(function (err, docs) {
            resHelper.handleApiResponse(err, docs, res);
        });
    });

module.exports = router;