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

// const getById = async (id) => {
//   const [data] = await connection.execute('SELECT * FROM sales WHERE id=?', [id]);
//   return data;
// };

module.exports = ({
  getAll,
  // getById,
});
