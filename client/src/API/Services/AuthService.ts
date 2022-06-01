import { Claims } from "../interfaces/claims";
import { NewUser } from "../interfaces/NewUser";
import postLogin from "../Requests/Login/PostLogin";
import postSignUp from "../Requests/Login/PostSignUp";

export const authService = {
    async signIn(data: Claims) {
        let responseCode = await postLogin(data);
        
        if(responseCode === 200) {

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
        
        if(responseCode === 200) {
            return responseCode
            //currentUser undefined, figure out how to return the res.body.username 
            // setGlobalStateUser(currentUser);
            //clear cookie maybe?
        }
        return responseCode
    },

    async selectTeam() {
        sessionStorage.setItem('isTeamSelected', 'true');
    },

    async deselectTeam() {
        sessionStorage.setItem('isTeamSelected', 'false');
    }
}