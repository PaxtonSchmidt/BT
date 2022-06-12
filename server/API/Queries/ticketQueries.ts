import {connectionPool} from '../dbConnectionPool';
import getCurrentDate from '../Services/getCurrentDate';

function createTicketsTable(req: any, res: any) {
    let sql ="CREATE TABLE tickets(ticket_id INT(11) NOT NULL AUTO_INCREMENT, author_id INT(11) NOT NULL, title varchar(50) NOT NULL, description varchar(1000) NOT NULL, date_created DATETIME NOT NULL, date_last_updated DATETIME NOT NULL, assigned_user_id INT(11), resolution_status INT(1) NOT NULL, relevant_project_id int(11) NOT NULL, priority INT(1) NOT NULL, PRIMARY KEY(ticket_id))";

    connectionPool.query(sql, (err: Error, result: any) => {
        if(err) throw err;
        console.log(result);
        res.send('Tickets table created...');
    });
}

function addTicket(req: any, res: any, userTeamIDCombo: any, targetUserId: any, ticketPriority: any, relevantProjectId: any) {
    let assigneeId: any = null
    if(targetUserId === ''){
        assigneeId = null
    }else{
        assigneeId = targetUserId
    }

    let date = getCurrentDate()
    let ticket = {author_id: userTeamIDCombo[0], title: req.body.title, description: req.body.description, date_created: date, date_last_updated: date, assigned_user_id: assigneeId, resolution_status: '1', relevant_project_id: relevantProjectId, priority: ticketPriority}
    console.log(ticket)

    let sql = "INSERT INTO tickets SET ?"; 
    
    connectionPool.query(sql, ticket, (err: any, result: any) => {
        if (err) result.send(err);
        res.send(result.status);
    })
}

function getTeamTickets(teamID: any) {
    let sql = "SELECT t.ticket_id, ua.username AS author_username, ua.discriminator AS author_discriminator, t.title, t.description, t.date_created, t.date_last_updated, ub.username AS assignee_username, ub.discriminator AS assignee_user_discriminator, t.resolution_status, t.relevant_project_id  AS project_id, t.priority, p.name AS project_name FROM tickets t LEFT JOIN users ua ON t.author_id = ua.user_id LEFT JOIN users ub ON t.assigned_user_id = ub.user_id LEFT JOIN projects p ON t.relevant_project_id = p.project_id WHERE t.relevant_project_id IN (SELECT project_id FROM projects WHERE team_id= ?)"; 

    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, teamID, (err: any, result: any) => {
            return err ? reject(err) : resolve(result);
        });
    })
}

function getAssignedProjectTickets(userID: any, teamID: any){
    let values = [userID, teamID]
    let sql = "SELECT t.ticket_id, ua.username AS author_username, ua.discriminator AS author_discriminator, t.title, t.description, t.date_created, t.date_last_updated, ub.username AS assignee_username, ub.discriminator AS assignee_user_discriminator, t.resolution_status, t.relevant_project_id AS project_id, t.priority, p.name AS project_name FROM tickets t LEFT JOIN users ua ON t.author_id = ua.user_id LEFT JOIN users ub ON t.assigned_user_id = ub.user_id LEFT JOIN projects p ON t.relevant_project_id = p.project_id WHERE t.relevant_project_id IN (SELECT project_id from user_projects WHERE user_id= ? AND relevant_team_id= ?)"

    return new Promise<any>((resolve, reject) => {
        connectionPool.query(sql, values, (err: any, result: any) => {
            return err ? reject(err) : resolve(result);
        });
    })
}

module.exports = {createTicketsTable, addTicket, getTeamTickets, getAssignedProjectTickets}