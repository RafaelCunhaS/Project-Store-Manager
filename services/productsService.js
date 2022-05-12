const ProductsModel = require('../models/productsModel');
const { CONFLICT, NOT_FOUND } = require('../utils/statusCode');
const errorFunction = require('../utils/errorFunction');

const getAll = async () => {
  const result = await ProductsModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await ProductsModel.getById(id);

  if (!result.length) throw errorFunction(NOT_FOUND, 'Product not found');

  return result;
};

const create = async (name, quantity) => {
  const alreadyExists = await ProductsModel.getByName(name);

  if (alreadyExists.length) throw errorFunction(CONFLICT, 'Product already exists');

  const result = await ProductsModel.create(name, quantity);

  return result;
};

const update = async (id, name, quantity) => {
  await getById(id);

  const result = await ProductsModel.update(id, name, quantity);
  return result;
};

const exclude = async (id) => {
  await getById(id);
  await ProductsModel.exclude(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
