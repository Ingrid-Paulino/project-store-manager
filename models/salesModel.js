// const conn = require('./connection');

// const create = async (`product_id`, quantity) => {
//   try {
//     const query = 'INSERT INTO products (name, quantity) VALUES (?, ?)';

//     // row or result
//     const [row] = await conn.execute(query, [`product_id`, quantity]);

//     // console.log('result', row);
//     return { product_id: row.insertId, quantity };
//   } catch (err) {
//     return err.message;
//   }
// };

// module.exports = { create };
