const SalesModel = require('../models/salesModel');
const ProductsModel = require('../models/productsModel');
const { NOT_FOUND, UNPROCESSABLE_ENTITY } = require('../utils/statusCode');
const errorFunction = require('../utils/errorFunction');

const getAll = async () => {
  const result = await SalesModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await SalesModel.getById(id);

  if (!result.length) throw errorFunction(NOT_FOUND, 'Sale not found');

  return result;
};

const validateSale = async (array) => {
  const getQuantity = array.map(({ productId }) => ProductsModel.getById(productId));
  
  const response = await Promise.all(getQuantity);

  const quantityAvailable = response.map((el) => el[0].quantity);

  array.forEach(({ quantity }, i) => {
    if (quantity > quantityAvailable[i]) {
      throw errorFunction(UNPROCESSABLE_ENTITY, 'Such amount is not permitted to sell');
    }
  });
};

const create = async (array) => {
  await validateSale(array);

  const result = await SalesModel.create(array);
  return result;
};

const update = async (id, productId, quantity) => {
  await getById(id);
  
  const result = await SalesModel.update(id, productId, quantity);
  return result;
};

const exclude = async (id) => {
  await getById(id);
  await SalesModel.exclude(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
  validateSale,
};
