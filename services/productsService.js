const ProductsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await ProductsModel.getAll();
  return result;
};

module.exports = {
  getAll,
};
