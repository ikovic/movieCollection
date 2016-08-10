var Joi = require('joi');

var updateCollectionValidator = {
    _id: Joi.string().regex(/[a-fA-f0-9]{24}/).required(),
    slug: Joi.string().regex(/[a-zA-Z0-9]{12}/).required(),
    movieIds: Joi.array().required(),
    google: Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().required(),
        email: Joi.string().email(),
        image: Joi.string()
    })
};

var newCollectionValidator = {
    google: Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().required(),
        email: Joi.string().email(),
        image: Joi.string()
    })
};

exports.updateCollection = updateCollectionValidator;
exports.createCollection = newCollectionValidator;