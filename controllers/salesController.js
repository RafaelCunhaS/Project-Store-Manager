const SalesService = require('../services/salesService');
const { OK_STATUS, CREATED, NO_CONTENT } = require('../utils/statusCode');

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

const update = async (req, res) => {
  const [{ productId, quantity }] = req.body;
  const { id } = req.params;
  const result = await SalesService.update(id, productId, quantity);

  return res.status(OK_STATUS).json(result);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  await SalesService.exclude(id);

  return res.status(NO_CONTENT).json();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
