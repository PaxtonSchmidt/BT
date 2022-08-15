import * as Express from 'express';
import consumeCookie from '../Services/consumeCookies/consumeCookie.js';
import { consumeCookieFlags } from '../Services/consumeCookies/consumeCookieFlags.js';

export default async function demoCheckpoint(req: Express.Request, res: Express.Response, next: Express.NextFunction){
    let tokenInformation = consumeCookie( req.headers.cookie, consumeCookieFlags.tokenSocketIoFlag)
    let isDemoAccount: boolean = false
    
    //means they dont have a token, has to be hitting forget password with empty cookies. 
    //if they were querying any other url, they would have hit the authentication middleware before this
    //this null value comes from consumeCookie service function
    if(tokenInformation === null && req.url === '/logout'){return next()} 
    
    //anything here will have come through the auth middleware
    //by checking for userId we prevent people from logging is as those accounts, they can only be used for the demo
    tokenInformation.userID === 34 
    || tokenInformation.userID === 35 
    || tokenInformation.userID === 36
    ? isDemoAccount = true
    : isDemoAccount = false

    if(isDemoAccount === false){return next()}
    
    //POST, PUT and DELETEs reject with a 200 to mock a succesful response from the server
    //GETs, return next() 
    if(req.method === 'GET'){
        console.log('not bounced')
        return next()
    } 

    if(req.method === 'POST' && req.url === '/selectTeam'){
        res.locals.isDemo = true;
        return next()
    }

    if(req.method === 'DELETE'){
        console.log('bounced')
        return res.status(200).send({message: 'Server did not persist demo interaction'})
    } else if(req.method === 'POST'){
        console.log('bounced')
        return res.status(200).send({message: 'Server did not persist demo interaction'})
    } else if(req.method === 'PUT'){
        console.log('bounced')
        return res.status(200).send({message: 'Server did not persist demo interaction'})
    } else {
        return res.status(400)
    }
}