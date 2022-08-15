import { connectionPool } from '../../dbConnectionPool.js';

function fetchUserTeamRoleID(req: any, userTeamIDCombo: any) {
  let sql = 'SELECT role_id FROM user_teams WHERE user_id= ? AND team_id= ?';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, userTeamIDCombo, (err: any, result: any) => {
      return err ? reject(err) : resolve(result[0].role_id);
    });
  });
}

export { fetchUserTeamRoleID };
