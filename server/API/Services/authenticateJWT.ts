const jwt = require('jsonwebtoken');

export default function authenticateJWT(token: any) {
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    let isValidJWT: boolean = true;
    return isValidJWT;
  } catch {
    let isValidJWT: boolean = false;
    return isValidJWT;
  }
}
