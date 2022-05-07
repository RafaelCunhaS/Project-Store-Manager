const ProductsModel = require('../models/productsModel');

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

module.exports = {
  getAll,
  getById,
};
