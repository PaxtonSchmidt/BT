import {connectionPool} from '../dbConnectionPool';

function createTicketsTable(req: any, res: any) {
    let sql ="CREATE TABLE tickets(ticket_id INT(11) NOT NULL AUTO_INCREMENT, title varchar(50) NOT NULL, description varchar(1000) NOT NULL, date_created DATETIME NOT NULL, date_last_updated DATETIME NOT NULL, assigned_user_id INT(11), resolution_status INT(1) NOT NULL, visibility_level INT(1) NOT NULL, priority INT(1) NOT NULL, PRIMARY KEY(ticket_id))";

    connectionPool.query(sql, (err: Error, result: any) => {
        if(err) throw err;
        console.log(result);
        res.send('Tickets table created...');
    });
}

module.exports = {createTicketsTable}