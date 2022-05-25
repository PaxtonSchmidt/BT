import { connectionPool } from "../../dbConnectionPool";


async function fetchUserTeamRoles(user_id: string, team_id: string, res: any) {
    let user_team = [user_id, team_id]
    let sql = 'SELECT role_id FROM user_teams WHERE user_id = ? AND team_id = ?'
    

    connectionPool.query(sql, user_team, (err: any, result: any) => {
        if (err) throw(err);
        if(result === null){
            result.send('You dont have any roles on this team...')
        }
    })
}

module.exports = { fetchUserTeamRoles }
