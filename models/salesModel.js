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

const getById2 = async (id) => {
  const query = 'SELECT * FROM sales WHERE id = ?';
  const [[rows]] = await conn.execute(query, [id]);
  return rows;
};

const update = async (id, uupdateSales) => {
    await Promise.all(uupdateSales.map(async (item) => {
      console.log('item', item.quantity, id);
    const query = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ?';
    await conn.execute(query, [item.quantity, id]);
  }));

  return { saleId: id, itemUpdated: uupdateSales };
};

module.exports = { create, getAll, getById, getById2, update };
