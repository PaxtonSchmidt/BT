import * as Express from 'express';
import authenticateJWT from '../Services/authenticateJWT';
import consumeCookie from '../Services/consumeCookies/consumeCookie';
import { consumeCookieFlags } from '../Services/consumeCookies/consumeCookieFlags';

export default async function demoCheckpoint(req: Express.Request, res: Express.Response, next: Express.NextFunction){
    let tokenInformation = consumeCookie( req.headers.cookie, consumeCookieFlags.tokenSocketIoFlag)
    let isDemoAccount: boolean = false

    //means they dont have a token, has to be hitting forget password with empty cookies. 
    //if they were querying any other url, they would have hit the authentication middleware before this

    //this null value comes from consumeCookie service function
    if(tokenInformation === null && req.url === '/logout'){return next()} 
    
    tokenInformation.userID === 34 
    || tokenInformation.userID === 35 
    || tokenInformation.userID === 36
    ? isDemoAccount = true
    : isDemoAccount = false

    if(isDemoAccount === false){return next()} 

    //some POSTs and PUTs need data back from the server for the client to operate
    //have to come up with a way for the data to be sent back as if those actions were initialized

    //POST or PUT that doesnt need data, reject
    //DELETEs, reject
    //GETs, return next() 

    //need to make sure to disable unecessary nav buttons on the client if the user is a Demo account

    if(req.method === 'GET'){
        console.log(req.method)
        return next()
    } else if(req.method === 'DELETE'){
        console.log(req.method)
        return res.status(200).send({message: 'Server did not persist demo interaction'})
    } else if(req.method === 'POST'){
        console.log(req.method)
    } else if(req.method === 'PUT'){
        console.log(req.method)
    }
}