var express = require('express'),
    router = express.Router(),
    passport = require('passport');

router.route('/auth/google')
    .get(passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read']
    }));

router.route('/auth/google/callback')
    .get(passport.authenticate('google', {
        successRedirect: '/api/movies',
        failureRedirect: '/login'
    }));

module.exports = router;

