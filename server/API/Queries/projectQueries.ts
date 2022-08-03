import { connectionPool } from '../dbConnectionPool';
import { Teammate } from '../Interfaces/teammate';
import getCurrentDate from '../Services/getCurrentDate';
let mysql = require('mysql');

async function addProject(
  creatorId: any,
  teamID: any,
  name: string,
  description: string,
  role: number
) {
  let date = getCurrentDate();
  let project = {
    team_id: teamID,
    creator_user_id: creatorId,
    name: name,
    description: description,
    date_created: date,
  };
  let sql = 'INSERT INTO projects SET ?';
  let user_projectSQL = 'INSERT INTO user_projects SET ?';
  let insertId: any = null;

  return new Promise<any>((resolve, reject) => {
    connectionPool.getConnection(function (err: any, connection: any) {
      if (err) throw err;

      try {
        connection.beginTransaction(function (err: any) {
          if (err) throw err;
          //create project
          let insertId = connection.query(
            sql,
            project,
            (err: any, result: any) => {
              if (err) {
                connection.rollback(function () {
                  throw err;
                });
              }
              insertId = result.insertId;

              //add user to project
              let user_projectValues = {
                user_id: creatorId,
                project_id: insertId,
                role_id: role,
                relevant_team_id: teamID,
                enlisted_by_user_id: creatorId,
                date_joined: date,
              };
              connection.query(
                user_projectSQL,
                user_projectValues,
                (err: any) => {
                  if (err) {
                    connection.rollback(function () {
                      throw err;
                    });
                  }

                  //commit changes
                  connection.commit(function (err: any, result: any) {
                    if (err) {
                      connection.rollback(function () {
                        throw err;
                      });
                    }
                  });
                  resolve(insertId);
                }
              );
            }
          );
        });
      } catch (e) {
        return console.log(e);
      }
    });
  });
}

function getSessionProjectRoles(teamID: string, userID: string) {
  let values = [teamID, userID];
  let sql =
    'SELECT p.project_id AS project_id, p.name AS name, up.role_id AS role_id FROM projects p LEFT JOIN user_projects up ON up.project_id = p.project_id WHERE p.team_id= ? AND up.user_id= ?';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function getAllProjectsOnTeam(teamID: number, userID: number) {
  let values = [teamID, userID];
  let sql =
    'SELECT p.project_id AS project_id, p.name FROM projects p WHERE p.team_id= ?';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function getProjectMembers(userID: any, teamID: any) {
  let values = [userID, teamID];
  let sql =
    'SELECT up.project_id, up.role_id, u.username, u.discriminator FROM user_projects up LEFT JOIN users u ON u.user_id = up.user_id WHERE up.project_id IN (SELECT project_id from user_projects WHERE user_id= ? AND relevant_team_id= ?)';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function getProjectMembersForLead(teamID: any) {
  let values = [teamID];
  let sql =
    'SELECT up.project_id, up.role_id, u.username, u.discriminator FROM user_projects up LEFT JOIN users u ON u.user_id = up.user_id WHERE up.project_id IN (SELECT project_id from user_projects WHERE relevant_team_id= ?)';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function getProjectMembersByProjectId(projectId: number) {
  let values = [projectId];
  let sql =
    'SELECT u.username, u.discriminator, up.role_id FROM users u LEFT JOIN user_projects up ON u.user_id = up.user_id WHERE project_id= ?';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function isUserOnProject(userID: any, projectID: any) {
  let values = [userID, projectID];
  let sql =
    'SELECT EXISTS(SELECT * FROM user_projects WHERE user_id= ? AND project_id= ?)';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function isUserOnProjectByNameDiscriminator(
  username: string,
  discriminator: number,
  project_id: number
) {
  let values = [username, discriminator, project_id];
  let sql =
    'SELECT EXISTS(SELECT up.role_id FROM user_projects up LEFT JOIN users u ON up.user_id = u.user_id WHERE u.username= ? AND u.discriminator= ? AND up.project_id= ?)';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function getProjectIdByTeamIdAndProjectName(
  teamID: number,
  projectName: string
) {
  let values = [teamID, projectName];
  let sql = 'SELECT project_id FROM projects WHERE team_id= ? AND name= ?';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result[0]);
    });
  });
}
function getRelatedMemberDetails(userId: string, teamID: any) {
  let values = [userId, teamID];
  let sql =
    'SELECT uA.username, uA.discriminator, up.project_id, up.role_id, up.date_joined AS dateAssigned, uB.username AS assignedByUsername, uB.discriminator AS assignedByUserDiscriminator, p.name AS project_name FROM user_projects up LEFT JOIN users uA ON up.user_id = uA.user_id LEFT JOIN users uB ON up.enlisted_by_user_id = uB.user_id LEFT JOIN projects p ON up.project_id = p.project_id WHERE up.project_id IN (SELECT project_id from user_projects WHERE user_id= ? AND relevant_team_id= ?) ';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function getAllMemberDetails(teamID: any) {
  let values = [teamID];
  let sql =
    'SELECT uA.username, uA.discriminator, up.project_id, up.role_id, up.date_joined AS dateAssigned, uB.username AS assignedByUsername, uB.discriminator AS assignedByUserDiscriminator, p.name AS project_name FROM user_projects up LEFT JOIN users uA ON up.user_id = uA.user_id LEFT JOIN users uB ON up.enlisted_by_user_id = uB.user_id LEFT JOIN projects p ON up.project_id = p.project_id WHERE up.project_id IN (SELECT project_id from projects WHERE team_id= ?) ';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function getRoleByUserIdProjectId(userID: number, projectID: number) {
  let values = [userID, projectID];
  let sql =
    'SELECT role_id FROM user_projects WHERE user_id= ? AND project_id= ?';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function getRoleByUsernameDiscriminatorProjectId(
  username: string,
  discriminator: number,
  projectID: number
) {
  let values = [username, discriminator, projectID];
  let sql =
    'SELECT up.role_id FROM user_projects up LEFT JOIN users u ON up.user_id = u.user_id WHERE username= ? AND discriminator= ? AND project_id= ?';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      if (err) throw err;
      return err ? reject(err) : resolve(result);
    });
  });
}
function updateMemberRole(targetUserID: any, projectID: any, newRoleId: any) {
  let values = [newRoleId, targetUserID, projectID];
  let sql =
    'UPDATE user_projects SET role_id= ? WHERE user_id= ? AND project_id= ?';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function addListOfUsersToProject(
  newMemberIds: number[],
  project_id: number,
  team_id: number,
  currentUserId: number
) {
  let values: any[] = [];
  let roleIdOfDev = 3;
  newMemberIds.forEach((member: number) => {
    values.push([
      member,
      project_id,
      roleIdOfDev,
      team_id,
      currentUserId,
      getCurrentDate(),
    ]);
  });
  let sql =
    'INSERT INTO user_projects (user_id, project_id, role_id, relevant_team_id, enlisted_by_user_id, date_joined) VALUES ?';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, [values], (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}
function projectMembersIdsByProjectId(projectID: number) {
  let sql = 'SELECT user_id FROM user_projects WHERE project_id= ?';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, projectID, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

//transactions
async function transactionRemoveTargetUserFromProject(
  targetUserId: number,
  projectId: number
) {
  let values = [targetUserId, projectId];
  let deleteSql =
    'DELETE FROM user_projects WHERE user_id= ? AND project_id= ?';
  let unassignSql =
    'UPDATE tickets SET assigned_user_id = NULL, resolution_status = 1 WHERE assigned_user_id= ? AND relevant_project_id= ?';

  connectionPool.getConnection(function (err: any, connection: any) {
    if (err) throw err;

    try {
      connection.beginTransaction(function (err: any) {
        if (err) throw err;
        //unassign tickets
        connection.query(deleteSql, values, (err: any) => {
          if (err) {
            connection.rollback(function () {
              throw err;
            });
          }
        });
        //delete user_project
        connection.query(unassignSql, values, (err: any) => {
          if (err) {
            connection.rollback(function () {
              throw err;
            });
          }
        });
        //commit changes
        connection.commit(function (err: any) {
          if (err) {
            connection.rollback(function () {
              throw err;
            });
          }
        });
      });
    } catch (e) {
      return console.log(e);
    }
  });
}

module.exports = {
  addProject,
  getSessionProjectRoles,
  getProjectMembers,
  isUserOnProject,
  isUserOnProjectByNameDiscriminator,
  getProjectIdByTeamIdAndProjectName,
  getRelatedMemberDetails,
  getAllMemberDetails,
  getRoleByUserIdProjectId,
  updateMemberRole,
  getRoleByUsernameDiscriminatorProjectId,
  transactionRemoveTargetUserFromProject,
  getProjectMembersByProjectId,
  addListOfUsersToProject,
  projectMembersIdsByProjectId,
  getAllProjectsOnTeam,
  getProjectMembersForLead,
};
