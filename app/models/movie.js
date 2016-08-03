var db = require('../helpers/db');

exports.findAll = function (cb) {
    var collection = db.get().collection('movies');

    collection.find().toArray(function (err, docs) {
        cb(err, docs);
    });
};

exports.findById = function (movieId, cb) {
    var collection = db.get().collection('movies'),
        oid = db.getObjectId(movieId);

    collection.find({_id: oid}).limit(1).next(function (err, doc) {
        cb(err, doc);
    });
};

exports.findByUser = function (userId, cb) {
    var collection = db.get().collection('movies');

    collection.find().toArray(function (err, docs) {
        cb(err, docs);
    });
};
