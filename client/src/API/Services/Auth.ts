import { Claims } from "../interfaces/claims";
import getCurrentUser from "../Requests/GetCurrentUser";
import postLogin from "../Requests/PostLogin";

export const auth = {
    isAuthenticated: false,
    async signIn(data: Claims) {
        await postLogin(data);
        //getCurrentUser needs to run ONLY if postLogin returns 200
        //currently, getCurrentUser will run on login fail, getting the user for any extraneous token left in the http only cookie. It would likely fail for expiree but that would in-turn send the user a very confusing 401
        await getCurrentUser();
    },
    signOut() {
        auth.isAuthenticated = false;
    }
}