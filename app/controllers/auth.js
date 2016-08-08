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
            if (req.user) {
                res.json(req.user);
            } else {
                res.sendStatus(401);
            }
        });


router.route('/logout')
    .get(function (req, res) {
        req.logout();
        res.sendStatus(200);
    });

module.exports = router;

