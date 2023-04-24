import Joi from 'joi';
import ref from '../domain/ref.js';
import GetConfigValidationResultInterface from '../../interfaces/validation/GetConfigValidationResultInterface.js';

export default Joi.object<GetConfigValidationResultInterface>({
  ref,
});
