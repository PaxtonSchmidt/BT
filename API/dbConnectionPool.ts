import mysql from 'mysql'

function createConnectionPool() {
  
  let port: any = process.env.port || 3306
  return mysql.createPool({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b22a41d3bb39dd',
    password: 'bc5bc6f0',
    database: 'heroku_f4960e01ddc6ff0'
  });
}

export const connectionPool = createConnectionPool();