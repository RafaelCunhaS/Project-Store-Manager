const ProductsService = require('../services/productsService');
const { OK_STATUS, CREATED, NO_CONTENT } = require('../utils/statusCode');

const getAll = async (_req, res) => {
  const result = await ProductsService.getAll();

  return res.status(OK_STATUS).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const [result] = await ProductsService.getById(id);

  return res.status(OK_STATUS).json(result);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await ProductsService.create(name, quantity);

  return res.status(CREATED).json(result);
};

const update = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const result = await ProductsService.update(id, name, quantity);

  return res.status(OK_STATUS).json(result);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  await ProductsService.exclude(id);

  return res.status(NO_CONTENT).json();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
