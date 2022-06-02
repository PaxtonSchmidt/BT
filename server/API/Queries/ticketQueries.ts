import {connectionPool} from '../dbConnectionPool';

function createTicketsTable(req: any, res: any) {
    let sql ="CREATE TABLE tickets(ticket_id INT(11) NOT NULL AUTO_INCREMENT, author_id INT(11) NOT NULL, title varchar(50) NOT NULL, description varchar(1000) NOT NULL, date_created DATETIME NOT NULL, date_last_updated DATETIME NOT NULL, assigned_user_id INT(11), resolution_status INT(1) NOT NULL, relevant_project_id int(11) NOT NULL, priority INT(1) NOT NULL, PRIMARY KEY(ticket_id))";

    connectionPool.query(sql, (err: Error, result: any) => {
        if(err) throw err;
        console.log(result);
        res.send('Tickets table created...');
    });
}

function addTicket(req: any, res: any) {
    let ticket = {author_id: '5', title: req.body.title, description: req.body.description, date_created: '2022-05-05', date_last_updated: '2022-05-05', assigned_user_id: '4', resolution_status: '1', relevant_project_id: '1', priority: '1'}

    let sql = "INSERT INTO tickets SET ?"; 
    
    connectionPool.query(sql, ticket, (err: any, result: any) => {
        if (err) result.send(err);
        res.send(result.status);
    })
}

function getTickets(req: any, res: any) {
    let sql = "SELECT * FROM tickets"; 

    connectionPool.query(sql, (err: any, result: any) => {
        if (err) throw(err);
        res.send(result);
    })
}

module.exports = {createTicketsTable, addTicket, getTickets}