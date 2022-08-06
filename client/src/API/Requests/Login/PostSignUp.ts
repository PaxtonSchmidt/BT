import { NewUser } from '../../interfaces/NewUser';
import postBase from '../Base/postBaseRequest';

export default async function postSignUp(data: NewUser) {
  return postBase('/signup/signup', data)
}
