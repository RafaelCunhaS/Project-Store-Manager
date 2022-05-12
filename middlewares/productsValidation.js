const Joi = require('joi');
const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = require('../utils/statusCode');
const errorFunction = require('../utils/errorFunction');

const schema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

const validateProduct = (req, _res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    if (error.message.includes('required')) next(errorFunction(BAD_REQUEST, error.message));
    next(errorFunction(UNPROCESSABLE_ENTITY, error.message));
  }
  next();
};

module.exports = {
  validateProduct,
};
