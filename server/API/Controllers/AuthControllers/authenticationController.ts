import { connectionPool } from "../../dbConnectionPool";

function fetchUser(queryEmail: string) {
    let sql = "Select * from users WHERE email = ?";

    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, queryEmail, (err: any, result: any) => {
            console.log('server fetched user...')
            return err ? reject(err) : resolve(result[0]);
        });
    })
}

module.exports = { fetchUser }