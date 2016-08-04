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

router.route('/collection/:slug')
    .get(function (req, res) {
        Collection.findBySlug(req.params.slug, function (err, doc) {
            resHelper.handleApiResponse(err, doc, res);
        });
    });

module.exports = router;