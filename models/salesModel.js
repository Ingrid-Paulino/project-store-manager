const conn = require('./connection');

const productModel = require('./productsModel');

const createSale = async () => {
  const query = 'INSERT INTO sales (date) VALUES (?)';
  const [row] = await conn.execute(query, [new Date()]);
  // console.log('row', row);
  return row.insertId;
};

const create = async (itemsSold) => {
  // console.log('itemsSold', itemsSold);
  const saleId = await createSale();
  // console.log('saleId', saleId);

  const createQuery = itemsSold.map(async (item) => {
    const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
    await conn.execute(query, [saleId, item.product_id, item.quantity]);
  });

  await Promise.all(createQuery);
  const atualizaQuantidade = itemsSold.map(async (item) => {
    await productModel.atualizaQuantidadeDeProdutos(item.product_id, (item.quantity * -1));
  });

  await Promise.all(atualizaQuantidade);
  // console.log('itemsSold', saleId, itemsSold);
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
  // console.log(rows);
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
  // console.log('rows', rows);
  return rows;
};

const getById2 = async (id) => {
  const query = 'SELECT * FROM sales WHERE id = ?';
  const [rows] = await conn.execute(query, [id]);
  // console.log('rows', rows);
  return rows;
};

const update = async (id, uupdateSales) => {
    await Promise.all(uupdateSales.map(async (item) => {
      // console.log('item', item.quantity, id);
      console.log('item', uupdateSales, id);

    const query = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ?';
    await conn.execute(query, [item.quantity, id]);
  }));

  // const estoque = 10;

  // const atualizaQuantidade = uupdateSales.map(async (item) => {
  //   await productModel.atualizaQuantidadeDeProdutos(item.product_id, item.quantity, '-');
  // });

  console.log('rows', id, uupdateSales);

  return { saleId: id, itemUpdated: uupdateSales };
};

const remove = async (id) => {
  const query = 'DELETE FROM sales_products WHERE sale_id = ?';
    
  await conn.execute(query, [id]);

  return true;
};

// const update = async (id, uupdateSales) => {
//   await Promise.all(uupdateSales.map(async (item) => {
//     // console.log('item', item.quantity, id);
//     console.log('item', uupdateSales, id);

//   const query = 'UPDATE products SET quantity = ? WHERE id = ?';
//   await conn.execute(query, [item.quantity, id]);
// }));

// };

// const lastSale = async (id) => {
//   const query = 'SELECT * FROM sales_products WHERE = ?';

//   const [row] = await conn.execute(query, [id]);
//   return row;
// };

module.exports = { 
  createSale,
  create,
  getAll,
  getById,
  getById2,
  update,
  remove,
  // lastSale,
 };
