var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    Collection = require('../models/collection');

// load the auth variables
var configAuth = require('./auth');

module.exports = function (passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (collection, done) {
        done(null, collection);
    });

    // used to deserialize the user
    passport.deserializeUser(function (user, done) {
        Collection.findById(user._id, function (err, collection) {
            done(err, collection);
        });
    });

    passport.use(new GoogleStrategy({
            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL
        },
        function (token, refreshToken, profile, done) {

            // make the code asynchronous
            // User.findOne won't fire until we have all our data back from Google
            process.nextTick(function () {

                // try to find the user based on their google id

                Collection.findByGoogleId(profile, function (err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        // if a user is found, log them in
                        return done(null, user);
                    } else {

                        // if the user isnt in our database, create a new user
                        var newUser = {google: {}};

                        // set all of the relevant information
                        newUser.google.id = profile.id;
                        newUser.google.token = token;
                        newUser.google.name = profile.displayName;
                        newUser.google.email = profile.emails[0].value; // pull the first email
                        newUser.google.image = profile._json.image.url;

                        // save the user
                        Collection.save(newUser, function (err, doc) {
                            if (err)
                                throw err;
                            return done(null, doc);
                        });
                    }
                });

            });
        }));
};