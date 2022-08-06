import { connectionPool } from '../dbConnectionPool';

function createUserTeamsTable(req: any, res: any) {
  let sql =
    'CREATE TABLE user_teams(user_id INT(11) NOT NULL, team_id INT(11) NOT NULL, role_id INT(1) NOT NULL, date_joined DATETIME NOT NULL, enlisted_by_user_id INT(11) NOT NULL, PRIMARY KEY(user_id, team_id))';

  connectionPool.query(sql, (err: Error, result: any) => {
    if (err) throw err;
    res.send('User teams table created...');
  });
}

function getUserTeams(current_user_id: number) {
  let sql =
    'SELECT  t.name AS team_name, t.team_id AS team_id, u.username AS owner_name, u.discriminator AS owner_discriminator, ut.date_joined FROM user_teams ut LEFT JOIN teams t ON ut.team_id = t.team_id LEFT JOIN users u ON t.owner_user_id = u.user_id WHERE ut.user_id = ?';

  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, current_user_id, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

module.exports = { createUserTeamsTable, getUserTeams };
