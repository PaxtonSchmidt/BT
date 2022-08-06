import { connectionPool } from '../dbConnectionPool';
import consumeCookie from '../Services/consumeCookies/consumeCookie';
import { consumeCookieFlags } from '../Services/consumeCookies/consumeCookieFlags';
import getCurrentDate from '../Services/getCurrentDate';

// function createTeamsTable(req: any, res: any) {
//     let sql ="CREATE TABLE teams(team_id INT(11) NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, date_created DATETIME NOT NULL, creator_user_id INT(11), PRIMARY KEY(team_id))";

//     connectionPool.query(sql, (err: Error, result: any) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Teams table created...');
//     });
// }
async function addTeamTransaction(
  user_id: number,
  name: string,
  date: string,
  role_id: number
) {
  let newTeamValues: any[] = [name, date, user_id];
  let newTeamSQL =
    'INSERT INTO teams SET name= ?, date_created= ?, owner_user_id= ?';
  let addCreatorToTeamValues: any[] = [user_id, role_id, date, user_id];
  let addCreatorToTeamSQL =
    'INSERT INTO user_teams SET team_id= ?, user_id= ?, role_id= ?, date_joined= ?, enlisted_by_user_id= ?';

  connectionPool.getConnection(function (err: any, connection: any) {
    try {
      connection.beginTransaction(function (err: any) {
        if (err) throw err;

        //create new team
        connection.query(newTeamSQL, newTeamValues, (err: any, result: any) => {
          if (err) {
            connection.rollback(function () {
              throw err;
            });
          }
          addCreatorToTeamValues.unshift(result.insertId);

          //add user to team
          connection.query(
            addCreatorToTeamSQL,
            addCreatorToTeamValues,
            (err: any) => {
              if (err) {
                connection.rollback(function () {
                  throw err;
                });
              }

              //commit changes
              connection.commit(function (err: any) {
                if (err) {
                  connection.rollback(function () {
                    throw err;
                  });
                }
              });
            }
          );
        });
      });
    } catch (e) {
      throw e;
    }
  });
}

async function isNameTaken(name: string) {
  let sql = 'SELECT EXISTS(SELECT team_id FROM teams WHERE name= ?)';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, name, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

async function addTeamInvite(
  req: any,
  res: any,
  userTeamIDCombo: any,
  recipientID: any
) {
  let invite = {
    recipient_id: recipientID,
    sender_id: userTeamIDCombo.userID,
    team_id: userTeamIDCombo.teamID,
    date_sent: getCurrentDate(),
  };
  let sql = 'INSERT INTO team_invites SET ?';

  connectionPool.query(sql, invite, (err: any) => {
    return res.ok;
  });
}
async function deleteTeamInvite(res: any, invite_id: string) {
  let sql = 'DELETE FROM team_invites WHERE invite_id= ?';

  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, invite_id, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function getTeamInvites(currentUserID: number) {
  let sql =
    'SELECT ti.invite_id, ti.date_sent AS date_sent, t.name AS team_name, u.username AS sender_name, u.discriminator AS sender_discriminator FROM team_invites ti LEFT JOIN teams t ON ti.team_id = t.team_id LEFT JOIN users u ON ti.sender_id = u.user_id WHERE ti.recipient_id= ?';

  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, currentUserID, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
async function getInviteById(invite_id: any) {
  let sql = 'SELECT * FROM team_invites WHERE invite_id= ?';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, invite_id, (err: any, result: any) => {
      return err ? reject(err) : resolve(result[0]);
    });
  });
}
async function fetchIsOnTeam(recipientID: string, teamID: string) {
  let values = [recipientID, teamID];
  let sql =
    'SELECT EXISTS(SELECT * FROM user_teams WHERE user_id= ? AND team_id= ?)';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
async function fetchIsOnTeamByUsernameDiscriminatorTeamID(
  username: string,
  discriminator: number,
  teamID: string
) {
  let values = [username, discriminator, teamID];
  let sql =
    'SELECT EXISTS(SELECT * FROM user_teams ut LEFT JOIN users u ON ut.user_id = u.user_id WHERE u.username= ? AND u.discriminator= ? AND team_id= ?)';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
async function getRoleIDByUsernameDiscriminatorTeamID(
  username: string,
  discriminator: number,
  team_id: number
) {
  let values = [username, discriminator, team_id];
  let sql =
    'SELECT ut.role_id FROM user_teams ut LEFT JOIN users u ON ut.user_id = u.user_id WHERE u.username= ? AND u.discriminator= ? AND ut.team_id= ?';

  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function getInviteByRecipientIDTeamID(
  recipientID: string,
  teamID: string,
  res: any
) {
  let values = [recipientID, teamID];
  let sql =
    'SELECT EXISTS(SELECT * FROM team_invites WHERE recipient_id= ? AND team_id= ?)';

  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function addUserToTeam(
  res: any,
  currentUserID: string,
  teamID: string,
  enlistedByUserID: string
) {
  let defaultRole: string = '3'; //defaults to dev
  let user = {
    user_id: currentUserID,
    team_id: teamID,
    role_id: defaultRole,
    date_joined: getCurrentDate(),
    enlisted_by_user_id: enlistedByUserID,
  };
  let sql = 'INSERT INTO user_teams SET ?';

  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, user, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function getSessionTeam(teamID: string, userID: string) {
  let sql =
    'SELECT t.name AS name, ut.date_joined AS date_joined, ut.role_id AS team_role FROM user_teams ut LEFT JOIN teams t ON t.team_id = ut.team_id WHERE t.team_id= ? AND ut.user_id= ?';
  let values = [teamID, userID];

  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result[0]);
    });
  });
}
function getUsersOnTeam(teamID: string) {
  let sql =
    'SELECT u.username, u.discriminator, ut.role_id AS team_role FROM users u LEFT JOIN user_teams ut ON u.user_id = ut.user_id WHERE ut.team_id= ?';
  let values = [teamID];

  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function getTeammatesInfo(teamID: number) {
  let sql =
    'SELECT uA.username, uA.discriminator, ut.role_id, ut.date_joined, uB.username AS enlisted_by_username, uB.discriminator AS enlisted_by_discriminator FROM user_teams ut LEFT JOIN users uA ON ut.user_id = uA.user_id LEFT JOIN users uB ON ut.enlisted_by_user_id = uB.user_id WHERE team_id= ?;';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, teamID, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function getTeammatesAssignedProjects(teamID: number) {
  let sql =
    'SELECT u.username, u.discriminator, p.name, up.role_id FROM users u LEFT JOIN user_projects up ON u.user_id = up.user_id LEFT JOIN projects p ON up.project_id = p.project_id WHERE up.project_id IN (SELECT project_id FROM projects WHERE team_id= ?)';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, teamID, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function getTicketCount(teamID: number) {
  let sql =
    'SELECT COUNT(*) FROM tickets WHERE relevant_project_id IN (SELECT project_id FROM projects WHERE team_id= ?)';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, teamID, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function getTeamDetailsPacket(team_id: number) {
  let sql =
    'SELECT u.username AS owner_username, u.discriminator AS owner_discriminator, t.date_created FROM teams t LEFT JOIN users u ON t.owner_user_id = u.user_id where t.team_id= ?;';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, team_id, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function getTeammateCount(teamID: number) {
  let sql = 'SELECT COUNT(*) FROM user_teams WHERE team_id= ?';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, teamID, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function putUpdateTeammateRole(
  user_id: number,
  roleID: number,
  team_id: number
) {
  let values = [roleID, user_id, team_id];
  let sql = 'UPDATE user_teams SET role_id= ? WHERE user_id= ? AND team_id= ?';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function getProjectCount(team_id: number){
  let values = [team_id];
  let sql = 'SELECT COUNT(*) FROM projects WHERE team_id= ?';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

async function transactionRemoveTargetUserFromTeam(
  targetUserId: number,
  team_id: number
) {
  let values = [targetUserId, team_id];
  let deleteProjectMembershipSql =
    'DELETE FROM user_projects WHERE user_id= ? AND project_id IN(SELECT project_id FROM projects WHERE team_id = ?)';
  let deleteTeamMembershiptSql =
    'DELETE FROM user_teams WHERE user_id= ? AND team_id= ?';
  let unassignSql =
    'UPDATE tickets SET assigned_user_id = null, resolution_status = 1 WHERE assigned_user_id= ? AND relevant_project_id IN (SELECT project_id FROM projects WHERE team_id = ?)';

  connectionPool.getConnection(function (err: any, connection: any) {
    try {
      connection.beginTransaction(function (err: any) {
        if (err) throw err;

        //unassign tickets
        connection.query(unassignSql, values, (err: any) => {
          if (err) {
            connection.rollback(function () {
              throw err;
            });
          }
          //delete project membership
          connection.query(deleteProjectMembershipSql, values, (err: any) => {
            if (err) {
              connection.rollback(function () {
                throw err;
              });
            }
            //delete team membership
            connection.query(deleteTeamMembershiptSql, values, (err: any) => {
              if (err) {
                connection.rollback(function () {
                  throw err;
                });
              }
              //commit changes
              connection.commit(function (err: any) {
                if (err) {
                  connection.rollback(function () {
                    throw err;
                  });
                }
              });
            });
          });
        });
      });
    } catch (e) {
      throw e;
    }
  });
}

module.exports = {
  addTeamTransaction,
  isNameTaken,
  addTeamInvite,
  deleteTeamInvite,
  getTeamInvites,
  getInviteByRecipientIDTeamID,
  fetchIsOnTeam,
  getInviteById,
  addUserToTeam,
  getSessionTeam,
  getUsersOnTeam,
  getTeammatesInfo,
  getTeammatesAssignedProjects,
  getTicketCount,
  getTeamDetailsPacket,
  getTeammateCount,
  fetchIsOnTeamByUsernameDiscriminatorTeamID,
  putUpdateTeammateRole,
  getRoleIDByUsernameDiscriminatorTeamID,
  getProjectCount,
  transactionRemoveTargetUserFromTeam
};
