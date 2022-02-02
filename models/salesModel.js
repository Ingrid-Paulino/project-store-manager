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

module.exports = { create };
