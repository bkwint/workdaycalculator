import Joi from 'joi';

export default Joi.string().regex(/^[a-zA-Z0-9-]+$/).required();
