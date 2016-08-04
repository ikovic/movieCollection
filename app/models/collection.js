var db = require('../helpers/db');

/**
 * Get all movie collections (one user can have only a single collection)
 * @param cb
 */
exports.findAll = function (cb) {
    var collection = db.get().collection('users');

    collection.find().toArray(function (err, docs) {
        cb(err, docs);
    });
};

exports.findBySlug = function (slug, cb) {
    var collection = db.get().collection('users');

    collection.find({slug: slug}).limit(1).next(function (err, doc) {
        cb(err, doc);
    });
};

// slug generator
//var id = crypto.randomBytes(6).toString('hex');
//=> bb5dc8842ca31d4603d6aa11448d1654