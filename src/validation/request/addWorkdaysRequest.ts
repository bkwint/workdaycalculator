import Joi from 'joi';
import ref from '../domain/ref';
import AddWorkdaysValidationResultInterface from '../../interfaces/validation/AddWorkdaysValidationResultInterface';

export default Joi.object<AddWorkdaysValidationResultInterface>({
  ref,
  date: Joi.date().required(),
  add: Joi.number().required(),
});
