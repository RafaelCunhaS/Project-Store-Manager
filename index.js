const express = require('express');
const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');
const error = require('./middlewares/errorMiddleware');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

module.exports = app;
