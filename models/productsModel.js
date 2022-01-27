const conn = require('./connection');

const create = async (name, quantity) => {
  try {
    const query = 'INSERT INTO products (name, quantity) VALUES (?, ?)';

    // row or result
    const [row] = await conn.execute(query, [name, quantity]);

    // console.log('result', row);
    return { id: row.insertId, name, quantity };
  } catch (err) {
    return err.message;
  }
};

const getByName = async (name) => {
  const query = 'SELECT * FROM products WHERE name = ?';
  const [[rows]] = await conn.execute(query, [name]);
  // console.log(rows);
  return rows;
};

const getAll = async () => {
  const query = 'SELECT * FROM products';
  const [rows] = await conn.execute(query);

  return rows;
};

const getById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';

  const [[row]] = await conn.execute(query, [id]);

  return row;
};

module.exports = {
  create,
  getByName,
  getAll,
  getById,
};