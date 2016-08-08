exports.isAuthenticated = function (req, res, next) {
    //console.log(req._passport);
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect(401, req.originalUrl);
    }
};