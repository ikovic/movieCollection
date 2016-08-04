var db = require('../helpers/db');

/**
 * Get all movies from DB
 * @param cb
 */
exports.findAll = function (cb) {
    var collection = db.get().collection('movies');

    collection.find().toArray(function (err, docs) {
        cb(err, docs);
    });
};

/**
 * Get a single movie from DB
 * @param movieId
 * @param cb
 */
exports.findById = function (movieId, cb) {
    var collection = db.get().collection('movies'),
        oid = db.getObjectId(movieId);

    collection.find({_id: oid}).limit(1).next(function (err, doc) {
        cb(err, doc);
    });
};

/**
 * Get multiple movies by ID array
 * @param movieId = array of IDs
 * @param cb
 */
exports.findByIds = function (movieIds, cb) {
    var collection = db.get().collection('movies'),
        oids;

    oids = movieIds.map(function (id) {
        return db.getObjectId(id);
    });

    collection.find({_id: {$in: oids}}).toArray(function (err, docs) {
        cb(err, docs);
    });
};

/**
 * Save a movie to the DB
 * @param movie
 * @param cb
 */
exports.save = function (movie, cb) {
    var collection = db.get().collection('movies');

    collection.insertOne(movie, function (err, doc) {
        cb(err, doc);
    });
};
