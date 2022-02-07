const conn = require('./connection');

const create = async (name, quantity) => {
    const query = 'INSERT INTO products (name, quantity) VALUES (?, ?)';

    // row or result
    const [row] = await conn.execute(query, [name, quantity]);
    // console.log('result', row);

    return { id: row.insertId, name, quantity };
};

const getByName = async (name) => {
  const query = 'SELECT * FROM products WHERE name = ?';
  const [[rows]] = await conn.execute(query, [name]);
  // console.log('rows', rows);
  return rows;
};
//
const getAll = async () => {
  const query = 'SELECT * FROM products';
  const [rows] = await conn.execute(query);
  // console.log('rows', rows);
  return rows;
};

const getById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[rows]] = await conn.execute(query, [id]);
  return rows;
};

const update = async (id, name, quantity) => {
  const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?';

  await conn.execute(query, [name, quantity, id]);

  return { id, name, quantity };
};

const remove = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?';
  
  await conn.execute(query, [id]);
  return true;
};

module.exports = {
  create,
  getByName,
  getAll,
  getById,
  update,
  remove,
};