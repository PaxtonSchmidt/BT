import { ok } from 'assert';
import { User } from '../../../Interfaces/User';
import consumeCookie from '../../../Services/consumeCookies/consumeCookie';
import { consumeCookieFlags } from '../../../Services/consumeCookies/consumeCookieFlags';
import getCurrentDate from '../../../Services/getCurrentDate';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authenticationQueries = require('../../../Queries/AuthQueries/authenticationQueries');
let users = require('../../../Queries/userQueries');

function login(req: any, res: any) {
  let claimsEmail = req.body.email;
  let claimsPassword = req.body.password;
  let targetUser: User;

  async function ifPassIsAuthenticSignAndSendJWT() {
    try {
      targetUser = await authenticationQueries.fetchTargetUser(claimsEmail);
    } catch (e) {
      return res.status(500).send({ message: 'Server Error...' });
    }

    try {
      let isValidPassword: boolean = await bcrypt.compare(
        claimsPassword,
        targetUser.password
      );

      if (isValidPassword === true) {
        let accessToken = await jwt.sign(
          {
            user_id: targetUser.user_id,
            token_v: targetUser.token_v,
          }, 
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '180s' }
        );
        res.cookie('token', accessToken, {
            httpOnly: true,
          }).status(200).send({ message: 'Welcome to our application' });
      } else {
        res
          .status(401)
          .send({ message: 'Invalid email and password combination...' });
      }
    } catch {
      res.status(500).send({ message: 'Server couldnt log you in...' });
    }
  }
  ifPassIsAuthenticSignAndSendJWT();
}

async function logout(req: any, res: any) {
  let userID = consumeCookie(
    req.headers.cookie,
    consumeCookieFlags.tokenUserIdFlag
  );
  let isInvalidated = false;

  try {
    let invalidated = (await users.incrementTokenVersion(userID)) === 'ok';
    isInvalidated = invalidated === true;
  } catch (e) {
    return res.status(500).send({ message: 'Server couldnt log you out...' });
  }

  if (isInvalidated === true) {
    let nullToken = await jwt.sign(
      { key: 'What do you want?' },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1ms' }
    );

    return res
      .cookie('token', nullToken, {
        httpOnly: true,
      })
      .status(200)
      .send({ message: 'You are logged out' });
  } else {
    return res.status(500).send({ message: 'Server is having trouble...' });
  }
}

module.exports = {
  login,
  logout,
};
