import {connectionPool} from '../dbConnectionPool';

function createTicketsTable(req: any, res: any) {
    let sql ="CREATE TABLE tickets(ticket_id INT(11) NOT NULL AUTO_INCREMENT, author_id INT(11) NOT NULL, title varchar(50) NOT NULL, description varchar(1000) NOT NULL, date_created DATETIME NOT NULL, date_last_updated DATETIME NOT NULL, assigned_user_id INT(11), resolution_status INT(1) NOT NULL, relevant_project_id int(11) NOT NULL, priority INT(1) NOT NULL, PRIMARY KEY(ticket_id))";

    connectionPool.query(sql, (err: Error, result: any) => {
        if(err) throw err;
        console.log(result);
        res.send('Tickets table created...');
    });
}

//how can you realiably pass a null key: value pair without causing error?
//passing an empty string with the key breaks, must removed the entire key: value pair from the ticket variable
//maybe pass each key value pair down to the ticket object individually, testing if any are null before passing down
function addTicket(req: any, res: any) {
    let ticket = {author_id: '6', title: 'test ticket 1', description: 'A description of the issue that is up to 1000 characters long', date_created: '2022-04-25', date_last_updated: '2022-04-25', assigned_user_id: '4', resolution_status: '1', relevant_project_id: '1', priority: '1'};

    let sql = "INSERT INTO tickets SET ?"; 
    
    connectionPool.query(sql, ticket, (err: any, result: any) => {
        if (err) result.send(err);
        console.log(result)
        res.send('Ticket added...');
    })
}

function getTickets(req: any, res: any) {
    let sql = "SELECT * FROM tickets"; 

    connectionPool.query(sql, (err: any, result: any) => {
        if (err) throw(err);
        console.log('Server got tickets from database...');
        res.send(result);
    })
}

module.exports = {createTicketsTable, addTicket, getTickets}