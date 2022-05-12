const Joi = require('joi');
const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = require('../utils/statusCode');
const errorFunction = require('../utils/errorFunction');

const schema = Joi.array().items(Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
}));

const validateSale = (req, _res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    if (error.message.includes('required')) {
      next(errorFunction(BAD_REQUEST, error.message.replace(/\[\d\]./g, '')));
    }
    next(errorFunction(UNPROCESSABLE_ENTITY, error.message.replace(/\[\d\]./g, '')));
  }
  next();
};

module.exports = {
  validateSale,
};
