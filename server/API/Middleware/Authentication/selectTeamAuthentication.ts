import consumeCookie from "../../Services/consumeCookies/consumeCookie";
import { consumeCookieFlags } from "../../Services/consumeCookies/consumeCookieFlags";
const jwt = require('jsonwebtoken');

//this function verifies given token and adds the new team_id to the payload of the jwt

function selectTeam(req: any, res: any) {
    console.log('tater-tots')
    async function addTeamToJWT() {
        try{
            let user_id = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserIdFlag)
            let targetTeam_id = req.body.team;
            console.log(user_id)
            console.log(`${targetTeam_id}is team id`)
            
            let accessToken = 
                await jwt.sign(
                    {user_id: user_id,
                    team_id: targetTeam_id},
                    process.env.ACCESS_TOKEN_SECRET, 
                    {expiresIn: '1800s'});

            console.log(accessToken);

            res.cookie('token', accessToken, {
                httpOnly: true
            }).send();
        
        } catch {
            res.status(500).send();
        }
    }
    addTeamToJWT();
}

module.exports = { selectTeam }