const connection = require('./connection');

const getAll = async () => {
  const [data] = await connection.execute('SELECT * FROM products ORDER BY id');
  return data;
};

const getById = async (id) => {
  const [data] = await connection.execute('SELECT * FROM products WHERE id=?', [id]);
  return data;
};

module.exports = ({
  getAll,
  getById,
});
