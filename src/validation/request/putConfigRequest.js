const Joi = require('joi');
const ref = require('../domain/ref')

module.exports = Joi.object().keys({
  ref,
  body: Joi.object().keys({
    country: Joi.string().valid('nl', 'be').required(),
    workdays: Joi.array().items(Joi.number().valid(1,2,3,4,5,6,7)).required(),
    maxDate: Joi.date().required(),
    exclude: Joi.array().items(Joi.date()).optional(),
  })
});