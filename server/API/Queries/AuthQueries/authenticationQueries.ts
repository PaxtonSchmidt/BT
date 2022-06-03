import { connectionPool } from "../../dbConnectionPool";
import consumeCookie from "../../Services/consumeCookies/consumeCookie";
import { consumeCookieFlags } from "../../Services/consumeCookies/consumeCookieFlags";

function fetchTargetUser(queryEmail: string) {
    let sql = "Select user_id, password FROM users WHERE email = ?";

    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, queryEmail, (err: any, result: any) => {
            return err ? reject(err) : resolve(result[0]);
        });
    })
}

async function fetchCurrentUser(req: any, res: any) {
    let currentUserId = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserIdFlag)

    let sql = 'SELECT username, discriminator, bio FROM users WHERE user_id = ?'
    

    connectionPool.query(sql, currentUserId, (err: any, result: any) => {
        if (err) throw(err);
        res.send(result);
    })
}



module.exports = { fetchTargetUser, fetchCurrentUser }