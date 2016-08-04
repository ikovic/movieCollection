exports.handleApiResponse = function (err, dbDoc, response) {
    if (err) {
        response.json({
            message: 'error',
            error: err
        });
    } else {
        response.json(dbDoc);
    }
};
