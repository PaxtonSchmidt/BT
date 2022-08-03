import { connectionPool } from '../dbConnectionPool';
import { Teammate } from '../Interfaces/teammate';
import getCurrentDate from '../Services/getCurrentDate';
const bcrypt = require('bcrypt');

async function addUser(
  username: string,
  discriminator: number,
  password: string,
  email: string,
  date_created: any,
  bio: string,
  token_v: string
) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  let values = [
    username,
    discriminator,
    hashedPassword,
    email,
    date_created,
    bio,
    token_v,
  ];

  let sql =
    'INSERT INTO users SET username= ?, discriminator= ?, password= ?, email= ?, date_created= ?, bio= ?, token_v= ?';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result[0]);
    });
  });
}

function getUsers(req: any, res: any) {
  let sql = 'SELECT * FROM users';

  connectionPool.query(sql, (err: any, result: any) => {
    if (err) throw err;
    res.send(result);
  });
}

function getUserByID(userID: string) {
  let sql = 'SELECT username, discriminator, bio FROM users WHERE user_id = ?';

  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, userID, (err: any, result: any) => {
      return err ? reject(err) : resolve(result[0]);
    });
  });
}

function getUserByNameDiscriminator(
  name: string,
  discriminator: string,
  res: any
) {
  let values = [name, discriminator];
  let sql = 'SELECT user_id FROM users WHERE username= ? AND discriminator= ?';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result[0]);
    });
  });
}

function getValidTokenVersion(user_id: string) {
  let sql = 'SELECT token_v FROM users WHERE user_id= ?';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, user_id, (err: any, result: any) => {
      return err ? reject(err) : resolve(result[0]);
    });
  });
}

// function getUserTeamRoleId

function checkUserTeam(userID: any, teamID: any) {
  let values = [userID, teamID];

  let sql =
    'SELECT EXISTS(SELECT * FROM user_teams WHERE user_id= ? AND team_id= ?)';

  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, values, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function incrementTokenVersion(user_id: string) {
  let sql = 'UPDATE users SET token_v = token_v + 1 WHERE user_id= ?';

  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, user_id, (err: any, result: any) => {
      return err ? reject(err) : resolve('ok');
    });
  });
}

function getIdsForUsernameDiscriminatorList(teammates: Teammate) {
  let sql =
    'SELECT user_id FROM users WHERE user_id IN (SELECT user_id FROM users WHERE username= ? AND discriminator= ?)';
  return new Promise<any>((resolve, reject) => {
    connectionPool.query(sql, teammates, (err: any, result: any) => {
      if (err) throw err;
      console.log(result);
      return err ? reject(err) : resolve('ok');
    });
  });
}

module.exports = {
  addUser,
  getUsers,
  getUserByID,
  getUserByNameDiscriminator,
  getValidTokenVersion,
  incrementTokenVersion,
  checkUserTeam,
  getIdsForUsernameDiscriminatorList,
};
