import authenticateJWT from '../Services/authenticateJWT.js';
import consumeCookie from '../Services/consumeCookies/consumeCookie.js';
import { consumeCookieFlags } from '../Services/consumeCookies/consumeCookieFlags.js';
import { getValidTokenVersion } from '../Queries/userQueries.js'

import jwt from 'jsonwebtoken'

async function authenticateRequest(
  req: any,
  res: any,
  next: any
) {
  if (req.headers.cookie === undefined) {
    return res.status(400).send({ message: 'Please sign in...' });
  }
  
  let tokenInformation = consumeCookie(
    req.headers.cookie,
    consumeCookieFlags.tokenSocketIoFlag
    );
  if(tokenInformation.userID === undefined){return res.status(401).send({message: 'Please login...'})}
  let tokenVersion = tokenInformation.tokenV;
  let userID = tokenInformation.userID;
  let token = tokenInformation.token;
  let validTokenVersion = { token_v: '' };
  
  try {
    validTokenVersion = await getValidTokenVersion(userID);
  } catch (e) {
    return res.status(500).send({ message: 'Couldnt validate request...' });
  }

  //the downside of this strategy is that a malicious user can refresh their tokens if the 
  //user doesnt log out and is unaware of malicious activity on their account
  if (tokenVersion !== validTokenVersion.token_v){//meaning the user logged out or hit forgot pass
    return res.status(401).send({message: 'Your session is invalid...'})
  } else if(authenticateJWT(token) !== true){//meaning expired
    //redirect to just a password form
    return res.status(403).send({message: 'Please authenticate again...'})
  } else {
    //refresh the token expirey, dont manipulate token version
    let secret: string = process.env.ACCESS_TOKEN_SECRET!
    let refreshedToken = await jwt.sign(
      {
        user_id: userID,
        team_id: tokenInformation.teamID,
        role_id: tokenInformation.roleID,
        token_v: tokenInformation.tokenV,
      },
      secret
      ,
      { expiresIn: '600s' }
    );
    res.cookie('token', 
      refreshedToken, {
      httpOnly: true,
    })
    next();
  }
}

export { authenticateRequest }
