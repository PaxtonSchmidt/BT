import mysql from 'mysql'

function createConnectionPool() {
  // process.env.port
  let port: any = 3306
  return mysql.createPool({
    connectionLimit: 10,
    host: process.env.host,
    port: port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
  });
}

export const connectionPool = createConnectionPool();
