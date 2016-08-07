exports.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect(401, req.originalUrl);
    }
};