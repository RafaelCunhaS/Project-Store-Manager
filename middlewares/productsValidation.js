const Joi = require('joi');
const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = require('../utils/statusCode');

const schema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

const validateProduct = (req, _res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    if (error.message.includes('required')) next({ status: BAD_REQUEST, message: error.message });
    next({ status: UNPROCESSABLE_ENTITY, message: error.message });
  }
  next();
};

module.exports = {
  validateProduct,
};
