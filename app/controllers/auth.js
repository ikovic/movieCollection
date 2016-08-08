var express = require('express'),
    router = express.Router(),
    passport = require('passport');

router.route('/google')
    .get(passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read']
    }));

router.route('/google/callback')
    .get(passport.authenticate('google', {
        successRedirect: '/api/movie',
        failureRedirect: '/login'
    }));

router.route('/google/signIn')
    .post(passport.authenticate('google-id-token'),
        function (req, res) {
            // do something with req.user
            res.sendStatus(req.user ? 200 : 401);
        });


router.route('/logout')
    .get(function (req, res) {
        req.logout();
        res.redirect('/');
    });

module.exports = router;

