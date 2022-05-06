const connection = require('./connection');

const getAll = async () => {
  const [data] = await connection.execute('SELECT * FROM products');
  return data;
};

module.exports = ({
  getAll,
});
