const connection = require('./connection');

const getAll = async () => {
  const [data] = await connection
    .execute(
      `SELECT sp.sale_id AS saleId, sa.date, sp.product_id AS productId, sp.quantity
      FROM sales AS sa 
      JOIN sales_products AS sp
      ON sa.id = sp.sale_id
      ORDER BY sp.sale_id, sp.product_id`,
    );
  return data;
};

const getById = async (id) => {
  const [data] = await connection
    .execute(
      `SELECT sa.date, sp.product_id AS productId, sp.quantity
      FROM sales AS sa 
      JOIN sales_products AS sp
      ON sa.id = sp.sale_id
      WHERE sa.id = ?
      ORDER BY sp.sale_id, sp.product_id`,
      [id],
    );
  return data;
};

const create = async (array) => {
  const date = new Date().toLocaleString('en-CA', { hour12: false });

  const [{ insertId: id }] = await connection
    .execute('INSERT INTO sales (date) VALUES (?)', [date]);
  
  const result = array.map(({ productId, quantity }) => connection.execute(
      `INSERT INTO sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)`, [id, productId, quantity],
  ));

  Promise.all(result);

  return ({
    id,
    itemsSold: array,
  });
};

const update = async (id, productId, quantity) => {
  await connection
    .execute('UPDATE sales_products SET quantity=? WHERE sale_id=? AND product_id=?',
    [quantity, id, productId]);

  return ({
    saleId: id,
    itemUpdated: [
      {
        productId,
        quantity,
      },
    ],
  });
};

const exclude = async (id) => connection.execute('DELETE FROM sales WHERE id=?', [id]);

module.exports = ({
  getAll,
  getById,
  create,
  update,
  exclude,
});
