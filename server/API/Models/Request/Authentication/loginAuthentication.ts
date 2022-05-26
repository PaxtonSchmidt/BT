import { User } from "../../../Interfaces/User";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authenticationQueries = require('../../../Controllers/AuthControllers/authenticationController');


function login(req: any, res: any) {
    let claimsEmail = req.body.email;
    let claimsPassword = req.body.password;
    let targetUser: User; 
    
    async function ifPassIsAuthenticSignAndSendJWT() {
        targetUser = await authenticationQueries.fetchTargetUser(claimsEmail);
        
        try{
            let isValidPassword: boolean = await bcrypt.compare(claimsPassword, targetUser.password);
            if(isValidPassword) {                

                let accessToken = 
                    await jwt.sign(
                    {user_id: targetUser.user_id},//cannot be a string because it breaks jwt.Sign()->{expiresIn}
                    process.env.ACCESS_TOKEN_SECRET, 
                    {expiresIn: '100000s'});
                console.log(accessToken);

                res.cookie('token', accessToken, {
                    httpOnly: true
                }).send();
                
            } else {
                res.status(401).send();
            }
        } catch {
            res.status(500).send();
        }
    }
    ifPassIsAuthenticSignAndSendJWT();
}

module.exports = { login }