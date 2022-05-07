const express = require('express');
const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');
const error = require('./middlewares/errorMiddleware');
const { validateProduct } = require('./middlewares/productsValidation');
const { validateSale } = require('./middlewares/salesValidation');

const app = express();
app.use(express.json());

app.use('/products', validateProduct, productsRouter);

app.use('/sales', validateSale, salesRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(error);

module.exports = app;
