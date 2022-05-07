const router = require('express').Router();
const ProductsController = require('../controllers/productsController');

router.get('/', ProductsController.getAll);

module.exports = router;
