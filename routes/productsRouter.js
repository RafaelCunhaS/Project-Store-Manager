const router = require('express').Router();
const rescue = require('express-rescue');
const ProductsController = require('../controllers/productsController');
const { validateProduct } = require('../middlewares/productsValidation');

router.get('/', ProductsController.getAll);

router.get('/:id', rescue(ProductsController.getById));

router.post('/', validateProduct, rescue(ProductsController.create));

module.exports = router;
