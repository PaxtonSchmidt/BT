import { Claims } from '../../interfaces/claims';
import postBase from '../Base/postBaseRequest';

export default async function postLogin(claims: Claims) {
  return postBase('/login', claims)
}
