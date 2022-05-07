const ProductsService = require('../services/productsService');
const { OK_STATUS } = require('../utils/statusCode');

const getAll = async (_req, res) => {
  const result = await ProductsService.getAll();

  return res.status(OK_STATUS).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const [result] = await ProductsService.getById(id);

  return res.status(OK_STATUS).json(result);
};

module.exports = {
  getAll,
  getById,
};
