import Joi from 'joi';
import ref from '../domain/ref';
import PutConfigValidationResultInterface from '../../interfaces/validation/PutConfigValidationResultInterface';

export default Joi.object<PutConfigValidationResultInterface>({
  ref,
  body: Joi.object().keys({
    zone: Joi.string().valid('nl', 'be').required(),
    workdays: Joi.array().items(Joi.number().valid(1, 2, 3, 4, 5, 6, 7)).required(),
    numberOfYears: Joi.number().required(),
    exclude: Joi.array().items(Joi.date()).optional().default([]),
    excludeHolidays: Joi.array().items(Joi.string()).optional().default([]),
  }),
});
