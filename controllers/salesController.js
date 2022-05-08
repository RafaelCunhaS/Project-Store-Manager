const SalesService = require('../services/salesService');
const { OK_STATUS, CREATED } = require('../utils/statusCode');

const getAll = async (_req, res) => {
  const result = await SalesService.getAll();

  return res.status(OK_STATUS).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await SalesService.getById(id);

  return res.status(OK_STATUS).json(result);
};

const create = async (req, res) => {
  const result = await SalesService.create(req.body);

  return res.status(CREATED).json(result);
};

module.exports = {
  getAll,
  getById,
  create,
};
