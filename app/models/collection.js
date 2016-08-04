var db = require('../helpers/db'),
    crypto = require('crypto');

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

/**
 * Find a collection by slug
 * @param slug
 * @param cb
 */
exports.findBySlug = function (slug, cb) {
    var collection = db.get().collection('users');

    collection.find({slug: slug}).limit(1).next(function (err, doc) {
        cb(err, doc);
    });
};

/**
 * Save the given collection
 * @param newCollection
 * @param cb
 */
exports.save = function (newCollection, cb) {
    var collection = db.get().collection('users');

    newCollection.slug = crypto.randomBytes(6).toString('hex');
    collection.insertOne(newCollection, function (err, doc) {
        cb(err, doc);
    });
};

exports.update = function (existingCollection, cb) {
    var collection = db.get().collection('users');

    // don't set the ID
    delete existingCollection._id;

    collection.updateOne(
        {slug: existingCollection.slug},
        {$set: existingCollection},
        function (err, doc) {
            cb(err, doc);
        });
};

// slug generator
//var id = crypto.randomBytes(6).toString('hex');
//=> bb5dc8842ca31d4603d6aa11448d1654