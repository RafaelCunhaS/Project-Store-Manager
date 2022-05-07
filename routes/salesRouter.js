const router = require('express').Router();
// const rescue = require('express-rescue');
const SalesController = require('../controllers/salesController');

router.get('/', SalesController.getAll);

// router.get('/:id', rescue(SalesController.getById));

module.exports = router;
