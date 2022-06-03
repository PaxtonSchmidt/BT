import consumeCookie from "../../Services/consumeCookies/consumeCookie";
import { consumeCookieFlags } from "../../Services/consumeCookies/consumeCookieFlags";
const jwt = require('jsonwebtoken');
let users = require('../../Queries/userQueries')

//this function verifies given token and adds the new team_id and roles ids for the team and projects within to the payload of the jwt
//needs to also check that the user is in the passed in team_id!!!!!!!!!
function selectTeam(req: any, res: any) {
    async function addTeamToJWT() {
        try{
            let user_id = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserIdFlag)
            let targetTeam_id = req.body.team;

            let token_v = await getV(user_id)
            
            async function getV(user_id: string) {
                try{
                    await users.getTokenVersion(user_id);
                } catch(e){
                    return e
                }
            }
            
            console.log(token_v)
            let accessToken = 
                await jwt.sign(
                    {
                    user_id: user_id,
                    team_id: targetTeam_id, 
                    token_v: token_v
                    },
                    process.env.ACCESS_TOKEN_SECRET, 
                    {expiresIn: '1800s'});

            res.cookie('token', accessToken, {
                httpOnly: true
            }).status(200).send({message: 'Welcome to your team'});
        
        } catch {
            res.status(500).send({message: 'Server couldnt sign you into your team...'});
        }
    }
    addTeamToJWT();
}

module.exports = { selectTeam }