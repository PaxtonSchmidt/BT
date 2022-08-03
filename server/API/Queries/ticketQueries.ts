import { connectionPool } from '../dbConnectionPool';
import getCurrentDate from '../Services/getCurrentDate';

function createTicketsTable(req: any, res: any) {
  let sql =
    'CREATE TABLE tickets(ticket_id INT(11) NOT NULL AUTO_INCREMENT, author_id INT(11) NOT NULL, title varchar(50) NOT NULL, description varchar(1000) NOT NULL, date_created DATETIME NOT NULL, date_last_updated DATETIME NOT NULL, assigned_user_id INT(11), resolution_status INT(1) NOT NULL, relevant_project_id int(11) NOT NULL, priority INT(1) NOT NULL, PRIMARY KEY(ticket_id))';

  connectionPool.query(sql, (err: Error, result: any) => {
    if (err) throw err;
    res.send('Tickets table created...');
  });
}

function addTicket(
  req: any,
  res: any,
  userTeamIDCombo: any,
  targetUserId: any,
  ticketPriority: any,
  relevantProjectId: any
) {
  let assigneeId: any = null;
  if (targetUserId === '') {
    assigneeId = null;
  } else {
    assigneeId = targetUserId;
  }

  let date = getCurrentDate();
  let values = [
    userTeamIDCombo[0],
    req.body.title,
    req.body.description,
    date,
    date,
    assigneeId,
    req.body.resolution_status,
    relevantProjectId,
    ticketPriority,
  ];
  console.log(values);
  // {author_id: userTeamIDCombo[0], title: req.body.title, description: req.body.description, date_created: date, date_last_updated: date, assigned_user_id: assigneeId, resolution_status: '1', relevant_project_id: relevantProjectId, priority: ticketPriority}

  let sql =
    'INSERT INTO tickets SET author_id= ?, title= ?, description= ?, date_created= ?, date_last_updated= ?, assigned_user_id= ?, resolution_status= ?, relevant_project_id= ?, priority= ?';

  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      console.log(result);
      return err ? reject(err) : resolve(result);
    });
  });
}

function getTeamTickets(teamID: any) {
  let sql =
    'SELECT t.ticket_id, ua.username AS author_username, ua.discriminator AS author_discriminator, t.title, t.description, t.date_created, t.date_last_updated, ub.username AS assignee_username, ub.discriminator AS assignee_user_discriminator, t.resolution_status, t.relevant_project_id  AS project_id, t.priority, p.name AS project_name FROM tickets t LEFT JOIN users ua ON t.author_id = ua.user_id LEFT JOIN users ub ON t.assigned_user_id = ub.user_id LEFT JOIN projects p ON t.relevant_project_id = p.project_id WHERE t.relevant_project_id IN (SELECT project_id FROM projects WHERE team_id= ?)';

  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, teamID, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function getAssignedProjectTickets(userID: any, teamID: any) {
  let values = [userID, teamID];
  let sql =
    'SELECT t.ticket_id, ua.username AS author_username, ua.discriminator AS author_discriminator, t.title, t.description, t.date_created, t.date_last_updated, ub.username AS assignee_username, ub.discriminator AS assignee_user_discriminator, t.resolution_status, t.relevant_project_id AS project_id, t.priority, p.name AS project_name FROM tickets t LEFT JOIN users ua ON t.author_id = ua.user_id LEFT JOIN users ub ON t.assigned_user_id = ub.user_id LEFT JOIN projects p ON t.relevant_project_id = p.project_id WHERE t.relevant_project_id IN (SELECT project_id from user_projects WHERE user_id= ? AND relevant_team_id= ?)';

  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function getNewTicket(ticket_id: number) {
  let sql =
    'SELECT t.ticket_id, ua.username AS author_username, ua.discriminator AS author_discriminator, t.title, t.description, t.date_created, t.date_last_updated, ub.username AS assignee_username, ub.discriminator AS assignee_user_discriminator, t.resolution_status, t.relevant_project_id  AS project_id, t.priority, p.name AS project_name FROM tickets t LEFT JOIN users ua ON t.author_id = ua.user_id LEFT JOIN users ub ON t.assigned_user_id = ub.user_id LEFT JOIN projects p ON t.relevant_project_id = p.project_id WHERE t.ticket_id= ?';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, ticket_id, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function getAssignedProjectTicketNotes(userID: any, teamID: any) {
  let values = [teamID, userID];
  let sql =
    'SELECT tc.comment_id, u.username AS author_username, u.discriminator AS author_discriminator, tc.comment_body AS body, tc.ticket_id AS relevant_ticket_id, tc.date_created FROM ticket_comment tc LEFT JOIN users u ON tc.author_user_id = u.user_id WHERE tc.ticket_id IN (SELECT ticket_id from tickets WHERE relevant_project_id IN(SELECT project_id FROM user_projects WHERE relevant_team_id= ? AND user_id= ?))';

  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function getAllTicketNotes(teamID: any) {
  let values = [teamID];
  let sql =
    'SELECT tc.comment_id, u.username AS author_username, u.discriminator AS author_discriminator, tc.comment_body AS body, tc.ticket_id AS relevant_ticket_id, tc.date_created FROM ticket_comment tc LEFT JOIN users u ON tc.author_user_id = u.user_id WHERE tc.ticket_id IN (SELECT ticket_id from tickets WHERE relevant_project_id IN(SELECT project_id FROM projects WHERE team_id= ?))';

  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function getTicketByID(ticketID: number) {
  let sql = 'SELECT * FROM tickets WHERE ticket_id= ?';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, ticketID, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function addTicketComment(ticketID: number, authorId: number, comment: string) {
  let values = [ticketID, authorId, getCurrentDate(), comment];
  let sql =
    'INSERT INTO ticket_comment SET ticket_id= ?, author_user_id= ?, date_created= ?, comment_body= ?';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function putEditTicket(
  ticket_id: number,
  assigned_user_id: number,
  description: string,
  resolution_status: number,
  priority: number
) {
  console.log('got here');
  let values = [
    assigned_user_id,
    priority,
    getCurrentDate(),
    description,
    resolution_status,
    ticket_id,
  ];
  console.log(values);
  let sql =
    'UPDATE tickets SET assigned_user_id= ?, priority= ?, date_last_updated= ?, description= ?, resolution_status= ? WHERE ticket_id= ?';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      console.log(err);
      return err ? reject(err) : resolve(result);
    });
  });
}

module.exports = {
  createTicketsTable,
  addTicket,
  getTeamTickets,
  getAssignedProjectTickets,
  getTicketByID,
  addTicketComment,
  getAssignedProjectTicketNotes,
  getAllTicketNotes,
  putEditTicket,
  getNewTicket,
};
