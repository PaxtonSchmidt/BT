import { connectionPool } from '../../dbConnectionPool.js';

function fetchTargetUser(queryEmail: string) {
  let sql = 'Select user_id, password, token_v FROM users WHERE email = ?';

  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, queryEmail, (err: any, result: any) => {
      return err ? reject(err) : resolve(result[0]);
    });
  });
}
export { fetchTargetUser };
