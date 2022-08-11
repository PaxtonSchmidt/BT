import { Claims } from '../API/interfaces/claims';
import { NewUser } from '../API/interfaces/NewUser';
import postLogin from '../API/Requests/Login/PostLogin';
import postSignUp from '../API/Requests/Login/PostSignUp';

export const authService = {
  async signIn(data: Claims) {
    let response = await postLogin(data);
    response.isOk && sessionStorage.setItem('isLoggedIn', 'true');
    response.isOk && sessionStorage.setItem('isDemo', 'false');
    return response
  },

  signOut() {
    sessionStorage.setItem('isLoggedIn', 'false');
  },

  async signUp(data: NewUser) {
    return await postSignUp(data);
  },

  async selectTeam() {
    sessionStorage.setItem('isTeamSelected', 'true');
  },

  async deselectTeam() {
    sessionStorage.setItem('isTeamSelected', 'false');
  },
};
