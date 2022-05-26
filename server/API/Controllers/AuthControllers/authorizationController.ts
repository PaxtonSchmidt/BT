import { connectionPool } from "../../dbConnectionPool";
import consumeCookie from "../../Services/consumeCookies/consumeCookie";
import { consumeCookieFlags } from "../../Services/consumeCookies/consumeCookieFlags";


function fetchUserTeamRoleID(req: any, res: any, userTeamIDCombo: any) {
    let variables = [userTeamIDCombo.userID, userTeamIDCombo.teamID]
    let sql = 'SELECT role_id FROM user_teams WHERE user_id= ? AND team_id= ?';
    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, variables, (err: any, result: any) => {
            return err ? reject(err) : resolve(result[0].role_id);
        });
    })
}

module.exports = { fetchUserTeamRoleID }
