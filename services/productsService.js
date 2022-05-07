const ProductsModel = require('../models/productsModel');
const { CONFLICT } = require('../utils/statusCode');

const getAll = async () => {
  const result = await ProductsModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await ProductsModel.getById(id);
  if (!result.length) {
    const error = { status: 404, message: 'Product not found' };
    throw error;
  }
  return result;
};

const validateCreation = async (name) => {
  const result = await ProductsModel.getByName(name);
  if (result.length) {
    const error = { status: CONFLICT, message: 'Product already exists' };
    throw error;
  }
  return true;
};

const create = async (name, quantity) => {
  await validateCreation(name);
  const result = await ProductsModel.create(name, quantity);

  return result;
};

module.exports = {
  getAll,
  getById,
  create,
};
