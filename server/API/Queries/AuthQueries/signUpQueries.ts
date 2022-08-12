import { connectionPool } from '../../dbConnectionPool.js';

function isEmailTaken(email: string) {
  return new Promise<any>((resolve, reject) => {
    let sqlEmail = 'SELECT EXISTS(SELECT * FROM users WHERE email = ?)';
    connectionPool.query(sqlEmail, email, (err: any, result: any) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function isUsernameAndDiscComboTaken(username: string, discriminator: number) {
  return new Promise<any>((resolve, reject) => {
    let variables = [username, discriminator];
    let sqlUsernameDiscriminator =
      'SELECT EXISTS(SELECT * FROM users WHERE username= ? AND discriminator= ?)';
    connectionPool.query(
      sqlUsernameDiscriminator,
      variables,
      (err: any, result: any) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export {
  isEmailTaken,
  isUsernameAndDiscComboTaken,
};
