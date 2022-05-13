import { Claims } from "../interfaces/claims";
import getCurrentUser from "../Requests/GetCurrentUser";
import postLogin from "../Requests/PostLogin";

export const authService = {
    async signIn(data: Claims) {
        let responseCode = await postLogin(data);
        
        if(responseCode === 200) {
            return responseCode
            //currentUser undefined, figure out how to return the res.body.username 
            // setGlobalStateUser(currentUser);
            //clear cookie maybe?
        }
        return 'Something went wrong...'
    },

    signOut() {
        
        // setGlobalStateUser(null);
        //clear cookie maybe?
    }
}