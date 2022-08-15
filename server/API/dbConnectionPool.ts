import mysql from 'mysql'

function createConnectionPool() {
  
  let port: any = process.env.port || 3306
  return mysql.createPool({
    host: process.env.host,
    port: port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,  });
}

export const connectionPool = createConnectionPool();
