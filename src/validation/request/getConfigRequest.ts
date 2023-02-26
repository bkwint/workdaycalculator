import Joi from 'joi';
import ref from '../domain/ref.js';

export default Joi.object().keys({
  ref
});