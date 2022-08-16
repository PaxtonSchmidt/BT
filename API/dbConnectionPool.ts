import mysql from 'mysql'

function createConnectionPool() {
  
  let port: any = process.env.port || 3306
  return mysql.createPool({
    //secrets
  });
}

export const connectionPool = createConnectionPool();