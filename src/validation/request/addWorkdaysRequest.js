const Joi = require('joi');
const ref = require('../domain/ref');

module.exports = Joi.object().keys({
    ref,
    date: Joi.date().required(),
    add: Joi.number().required(),
});