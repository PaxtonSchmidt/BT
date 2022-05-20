import { connectionPool } from "../../dbConnectionPool";
import consumeCookie from "../../Services/consumeCookie";

function fetchTargetUser(queryEmail: string) {
    let sql = "Select user_id, password FROM users WHERE email = ?";

    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, queryEmail, (err: any, result: any) => {
            console.log('server fetched user...')
            return err ? reject(err) : resolve(result[0]);
        });
    })
}

async function fetchCurrentUser(req: any, res: any) {
    let currentUserId = consumeCookie(req.headers.cookie, 'needTokenUser_id')
    console.log(currentUserId)

    let sql = 'SELECT username FROM users WHERE user_id = ?'
    

    connectionPool.query(sql, currentUserId, (err: any, result: any) => {
        if (err) throw(err);
        console.log('Server got current user from database...');
        res.send(result);
    })
}



module.exports = { fetchTargetUser, fetchCurrentUser }