const mysql = require('mysql2');
const util = require("util");
require('dotenv').config();

const DbConfig = {
  connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
  host: process.env.MYSQL_HOST ?? 'localhost',
  database: process.env.MYSQL_DATABASE ?? 'noglaxman',
  user: process.env.MYSQL_USER ?? 'root',
  password: process.env.MYSQL_PASSWORD ?? '2b67766ac41415ec93a07df1ada9b2b5',
  port: process.env.MYSQL_PORT
}

//Conexión a la base de datos
const pool = mysql.createPool(DbConfig)

pool.query = util.promisify(pool.query)

pool.getConnection((err, connection) => {
  if (err) {
    console.error(err, `Error al conectar con DB ${JSON.stringify(DbConfig)}`);
  }
  if (connection) {
    console.warn(`Conectado a DB ${JSON.stringify(DbConfig)}`);
  }
})


module.exports = pool;