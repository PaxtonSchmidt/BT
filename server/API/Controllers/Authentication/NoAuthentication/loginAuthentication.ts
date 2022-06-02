import { User } from "../../../Interfaces/User";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authenticationQueries = require('../../../Queries/AuthQueries/authenticationQueries');


function login(req: any, res: any) {
    let claimsEmail = req.body.email;
    let claimsPassword = req.body.password;
    let targetUser: User; 
    



    async function ifPassIsAuthenticSignAndSendJWT() {
        try{
            targetUser = await authenticationQueries.fetchTargetUser(claimsEmail);
        } catch(e){
            return res.status(500).send({message: 'Server Error...'})
        }
        
        
        try{
            let isValidPassword: boolean = await bcrypt.compare(claimsPassword, targetUser.password);
            if(isValidPassword === true) {                

                let accessToken = 
                    await jwt.sign(
                    {user_id: targetUser.user_id},//cannot be a string because it breaks jwt.Sign()->{expiresIn}
                    process.env.ACCESS_TOKEN_SECRET, 
                    {expiresIn: '100000s'});

                res.cookie('token', accessToken, {
                    httpOnly: true
                }).status(200).send({message: 'Welcome to our application'});
            } else {
                res.status(401).send({message: 'Invalid email and password combination...'});
            }
        } catch {
            res.status(500).send({message: 'Server couldnt log you in...'});
        }
    }
    ifPassIsAuthenticSignAndSendJWT();
}

module.exports = { login }