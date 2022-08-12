import * as Express from 'express';
import * as users from '../../../Queries/userQueries.js'
import jwt from 'jsonwebtoken'

interface demoTokenInfo {
    user_id: number,
    token_v: number
}

async function demoLogin(req: Express.Request, res: Express.Response){
    let demoUser: demoTokenInfo | null = null
    let discriminator: number | null = null

    if(req.body.characterName !== 'Jessie' && req.body.characterName !== 'Jamie' && req.body.characterName !== 'Jordan'){
        return res.status(401).send({message: 'You dont have access...'})
    }
    
    if(req.body.characterName === 'Jessie'){
        discriminator = 1111
    } else if(req.body.characterName === 'Jamie'){
        discriminator = 2222
    } else if(req.body.characterName === 'Jordan'){
        discriminator = 3333
    } else {
        return res.status(401).send({message: 'You dont have access...'})
    }

    try{
        let demoUserPacket = await users.getUserByNameDiscriminator(req.body.characterName, discriminator)
        demoUser = {
            user_id: demoUserPacket.user_id,
            token_v: 0
        }
    }catch(e){
        return res.status(500).send({message: 'Server couldnt get demo app...'})
    }
    // dont need to authenticate, just sign and send a demoUsers JWT
    let accessToken = await jwt.sign(
        demoUser, 
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: '180s' }
        );
    res.cookie('token', 
        accessToken, {
        httpOnly: true,
        }).status(200).send({ message: 'Welcome to our application' });
}

export {
    demoLogin
}