const router = require('express').Router();
const rescue = require('express-rescue');
const SalesController = require('../controllers/salesController');
const { validateSale } = require('../middlewares/salesValidation');

router.get('/', SalesController.getAll);

router.get('/:id', rescue(SalesController.getById));

router.post('/', validateSale, rescue(SalesController.create));

router.put('/:id', validateSale, rescue(SalesController.update));

module.exports = router;
