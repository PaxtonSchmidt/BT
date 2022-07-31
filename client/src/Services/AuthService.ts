import { Claims } from "../API/interfaces/claims";
import { NewUser } from "../API/interfaces/NewUser";
import postLogin from "../API/Requests/Login/PostLogin";
import postSignUp from "../API/Requests/Login/PostSignUp";

export const authService = {
    async signIn(data: Claims) {
        let responseCode = await postLogin(data);
        
        if(responseCode.status === 200) {

            sessionStorage.setItem('isLoggedIn', 'true');

            return responseCode
            //currentUser undefined, figure out how to return the res.body.username 
            // setGlobalStateUser(currentUser);
            //clear cookie maybe?
        }
        return responseCode
    },

    signOut() {
        sessionStorage.setItem('isLoggedIn', 'false');
    }, 

    async signUp(data: NewUser) {
        let responseCode = await postSignUp(data);
        return responseCode
    },

    async selectTeam() {
        sessionStorage.setItem('isTeamSelected', 'true');
    },

    async deselectTeam() {
        sessionStorage.setItem('isTeamSelected', 'false');
    }
}