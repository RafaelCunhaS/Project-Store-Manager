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

const update = async (id, name, quantity) => {
  await connection
    .execute('UPDATE products SET name=?, quantity=? WHERE id=?', [name, quantity, id]);

  return ({
    id,
    name,
    quantity,
  });
};

const updateQuantity = async (array, isExclude) => {
  const response = array
    .map(({ productId, quantity }) => {
      if (!isExclude) {
        return connection
          .execute('UPDATE products SET quantity = quantity-? WHERE id=?', [quantity, productId]);
      }
    return connection
      .execute('UPDATE products SET quantity = quantity+? WHERE id=?', [quantity, productId]);
  });
  
  await Promise.all(response);
};

const exclude = async (id) => connection.execute('DELETE FROM products WHERE id=?', [id]);

module.exports = ({
  getAll,
  getById,
  create,
  getByName,
  update,
  exclude,
  updateQuantity,
});
