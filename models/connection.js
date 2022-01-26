const mysql = require('mysql2/promise');
require('dotenv').config();

const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

// createPool fornece a conexão com o banco
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
});

module.exports = connection;