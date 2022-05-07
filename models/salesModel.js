const connection = require('./connection');

const getAll = async () => {
  const [data] = await connection.execute('SELECT * FROM sales ORDER BY saleId, productId');
  return data;
};

// const getById = async (id) => {
//   const [data] = await connection.execute('SELECT * FROM sales WHERE id=?', [id]);
//   return data;
// };

module.exports = ({
  getAll,
  // getById,
});
