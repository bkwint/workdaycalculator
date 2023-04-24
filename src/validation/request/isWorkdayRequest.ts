import Joi from 'joi';
import ref from '../domain/ref.js';
import IsWorkdayValidationResultInterface from '../../interfaces/validation/IsWorkdayValidationResultInterface.js';

export default Joi.object<IsWorkdayValidationResultInterface>({
  ref,
  date: Joi.date().required(),
});
