const connection = require('./connection');

const getAll = async () => {
  const [data] = await connection.execute('SELECT * FROM products ORDER BY id');
  return data;
};

const getById = async (id) => {
  const [data] = await connection.execute('SELECT * FROM products WHERE id=?', [id]);
  return data;
};

const getByName = async (name) => {
  const [result] = await connection.execute('SELECT * FROM products WHERE name=?', [name]);
  return result;
};

const create = async (name, quantity) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO products (name, quantity) VALUES (?, ?)', [name, quantity]);
    
  return ({
    id: insertId,
    name,
    quantity,
  });
};

module.exports = ({
  getAll,
  getById,
  create,
  getByName,
});
