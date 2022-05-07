const router = require('express').Router();
const rescue = require('express-rescue');
const ProductsController = require('../controllers/productsController');

router.get('/', ProductsController.getAll);

router.get('/:id', rescue(ProductsController.getById));

module.exports = router;
