var express = require('express'),
    router = express.Router(),
    Collection = require('../models/collection');

/**
 * Collections API
 */
router.route('/collection')
    .get(function (req, res) {
        Collection.findAll(function (err, docs) {
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

module.exports = router;