var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    GoogleTokenStrategy = require('passport-google-id-token'),
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

    passport.use(new GoogleTokenStrategy({
            clientID: configAuth.googleAuth.clientID
        },
        function (parsedToken, googleId, done) {
            // try to find the user based on their google id
            Collection.findByGoogleId(googleId, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isn't in our database, create a new user
                    var newUser = {google: {}};

                    // set all of the relevant information
                    newUser.google.id = googleId;
                    newUser.google.name = parsedToken.payload.name;
                    newUser.google.email = parsedToken.payload.email;
                    newUser.google.image = "";

                    // save the user
                    Collection.save(newUser, function (err, doc) {
                        if (err) {
                            throw err;
                        }
                        return done(null, doc);
                    });
                }
            });
        }
    ));

    passport.use(new GoogleStrategy({
            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL
        },
        function (token, refreshToken, profile, done) {

            process.nextTick(function () {

                // try to find the user based on their google id
                Collection.findByGoogleId(profile.id, function (err, user) {
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
                            if (err) {
                                throw err;
                            }
                            return done(null, doc);
                        });
                    }
                });

            });
        }));
};
