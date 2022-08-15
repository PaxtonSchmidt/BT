import { connectionPool } from '../dbConnectionPool.js';

function createTicketCommentsTable(req: any, res: any) {
  let sql =
    'CREATE TABLE ticket_comment(comment_id INT(11) NOT NULL AUTO_INCREMENT, ticket_id INT(11) NOT NULL,author_user_id INT(11) NOT NULL, date_created DATETIME NOT NULL, comment_body varchar(300) NOT NULL, edited_flag TINYINT(1), PRIMARY KEY(comment_id))';

  connectionPool.query(sql, (err: Error, result: any) => {
    if (err) throw err;
    res.send('Ticket comments table created...');
  });
}

export { createTicketCommentsTable };
