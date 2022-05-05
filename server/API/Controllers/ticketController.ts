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
    //this works. author_id should be gathered from db with details from token, date will be recorded on server side, assigned_user_id will be gathered with details from req.body.assignee, resolution status will be translated from req.body, relevane project id will be gathered from dbwith details from req.body, priority will be added using details from req.body
    let ticket = {author_id: '5', title: req.body.title, description: req.body.description, date_created: '2022-05-05', date_last_updated: '2022-05-05', assigned_user_id: '4', resolution_status: '1', relevant_project_id: '1', priority: '1'}

    console.log(ticket);

    //eventaully these queries will be parameterized 
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
        console.log('Server got tickets from database...');
        res.send(result);
    })
}

module.exports = {createTicketsTable, addTicket, getTickets}