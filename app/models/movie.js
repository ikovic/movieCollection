var db = require('../helpers/db');

exports.all = function (cb) {
    var collection = db.get().collection('movies');

    collection.find().toArray(function (err, docs) {
        cb(err, docs);
    });
};

exports.byUser = function (userId, cb) {
    var collection = db.get().collection('movies');

    collection.find().toArray(function (err, docs) {
        cb(err, docs);
    });
};
