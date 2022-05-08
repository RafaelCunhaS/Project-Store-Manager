const ProductsModel = require('../models/productsModel');
const { CONFLICT, NOT_FOUND } = require('../utils/statusCode');

const getAll = async () => {
  const result = await ProductsModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await ProductsModel.getById(id);
  if (!result.length) {
    const error = { status: NOT_FOUND, message: 'Product not found' };
    throw error;
  }
  return result;
};

const checkName = async (name) => {
  const alreadyExists = await ProductsModel.getByName(name);

  if (alreadyExists) {
    const error = { status: CONFLICT, message: 'Product already exists' };
    throw error;
  }

  return true;
};

const create = async (name, quantity) => {
  await checkName(name);

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
  checkName,
  update,
  exclude,
};
