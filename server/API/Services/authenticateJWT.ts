import jwt from 'jsonwebtoken';

export default function authenticateJWT(token: any) {
  try {
    let secret: string = process.env.ACCESS_TOKEN_SECRET!
    jwt.verify(token, secret);
    let isValidJWT: boolean = true;
    return isValidJWT;
  } catch {
    let isValidJWT: boolean = false;
    return isValidJWT;
  }
}
