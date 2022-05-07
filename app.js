const express = require('express');
const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');
const error = require('./middlewares/errorMiddleware');

const app = express();
app.use(express.json());

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(error);

module.exports = app;
