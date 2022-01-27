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

module.exports = {
  create,
  getByName,
};