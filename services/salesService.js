const SalesModel = require('../models/salesModel');

const getAll = async () => {
  const result = await SalesModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await SalesModel.getById(id);
  if (!result.length) {
    const error = { status: 404, message: 'Sale not found' };
    throw error;
  }
  return result;
};

module.exports = {
  getAll,
  getById,
};
