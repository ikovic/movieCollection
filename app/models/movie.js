var db = require('../helpers/db'),
    Client = require('node-rest-client').Client;

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

/**
 * Find a movie by the IMDb ID
 * @param imdbId
 * @param cb
 */
exports.findByImdbId = function (imdbId, cb) {
    var collection = db.get().collection('movies');

    collection.find({"imdbID": imdbId}).limit(1).next(function (err, doc) {
        cb(err, doc);
    });
};

/**
 * Get movie from external service by IMDb Id
 * @param imdbId
 * @param cb
 */
exports.fetchByImdbId = function (imdbId, cb) {
    var client = new Client();

    client.get("http://www.omdbapi.com/?i=" + imdbId, function (data, response) {
        cb(data);
    });
};
