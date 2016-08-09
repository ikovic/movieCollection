var express = require('express'),
    router = express.Router(),
    Collection = require('../models/collection'),
    resHelper = require('../helpers/responseHelper'),
    authMiddleware = require('../middlewares/auth');

/**
 * Collections API
 */
router.route('/collection')
    .get(function (req, res) {
        if (req.params.title) {
            Collection.searchByTitle(req.params.title, function (err, docs) {
                resHelper.handleApiResponse(err, docs, res);
            });
        } else {
            Collection.findAll(function (err, docs) {
                resHelper.handleApiResponse(err, docs, res);
            });
        }
    })
    .post(authMiddleware.isAuthenticated, function (req, res) {
        var newCollection = req.body;
        Collection.save(newCollection, function (err, doc) {
            resHelper.handleApiResponse(err, doc, res);
        });
    });

router.route('/collection/:slug')
    .get(function (req, res) {
        Collection.findBySlug(req.params.slug, function (err, doc) {
            resHelper.handleApiResponse(err, doc, res);
        });
    })
    .put(authMiddleware.isAuthenticated, function (req, res) {
        var updatedCollection = req.body;
        Collection.update(updatedCollection, function (err, doc) {
            resHelper.handleApiResponse(err, doc, res);
        });
    });

module.exports = router;
