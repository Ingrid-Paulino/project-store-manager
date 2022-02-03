const conn = require('./connection');

const createSale = async () => {
  const query = 'INSERT INTO sales (date) VALUES (?)';
  const [row] = await conn.execute(query, [new Date()]);
  return row.insertId;
};

const create = async (itemsSold) => {
  const saleId = await createSale();
  const createQuery = itemsSold.map(async (item) => {
    const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
    await conn.execute(query, [saleId, item.product_id, item.quantity]);
  });

  await Promise.all(createQuery);

  return { id: saleId, itemsSold };
};

// const getAll = async () => {
//   const query = 'SELECT * FROM sales_products';
//   const [rows] = await conn.execute(query);

//   return rows;
// };

const getAll = async () => {
  const query = `SELECT
    SP.sale_id AS saleId,
    SP.product_id,
    SP.quantity,
    S.date 
  FROM sales_products AS SP
  INNER JOIN sales AS S
    ON SP.sale_id = S.id `;

  const [rows] = await conn.execute(query);

  return rows;
};

const getById = async (id) => {
  const query = `SELECT
  SP.product_id,
  SP.quantity,
  S.date 
FROM sales_products AS SP
INNER JOIN sales AS S
  ON SP.sale_id = S.id
WHERE S.id = ?`;

  const [rows] = await conn.execute(query, [id]);
  return rows;
};

module.exports = { create, getAll, getById };
