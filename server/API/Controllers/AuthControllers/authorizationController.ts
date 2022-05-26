import { connectionPool } from "../../dbConnectionPool";


function fetchUserTeamRole(user_id: any, team_id: any, res: any) {
    let user_team = [user_id, team_id]
    console.log(user_team)
    let sql = 'SELECT role_id FROM user_teams WHERE user_id = ? AND team_id = ?'
    console.log('got here')
    
    
    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, user_team, (err: any, result: any) => {
            return err ? reject(err) : resolve(result[0]);
        });
    })
}

module.exports = { fetchUserTeamRole }
