import Joi from 'joi';
import ref from '../domain/ref';
import GetConfigValidationResultInterface from '../../interfaces/validation/GetConfigValidationResultInterface';

export default Joi.object<GetConfigValidationResultInterface>({
  ref,
});
