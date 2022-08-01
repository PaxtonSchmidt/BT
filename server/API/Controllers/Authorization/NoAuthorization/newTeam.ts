import * as Express from 'express'
import consumeCookie from '../../../Services/consumeCookies/consumeCookie';
import { consumeCookieFlags } from '../../../Services/consumeCookies/consumeCookieFlags';
import { consumeRowDataPacket } from '../../../Services/consumeRowDataPacket';
import getCurrentDate from '../../../Services/getCurrentDate';
let teams = require('../../../Queries/teamQueries')
let roles = require('../Roles')

async function addTeam(req: Express.Request, res: Express.Response) {
    let dateTime = getCurrentDate();
    let creatorUserId = consumeCookie(req.headers.cookie, consumeCookieFlags.tokenUserIdFlag);
    let role_id = roles.Legend.owner;
    let isNameTaken: boolean = true

    try{
        let isNameTakenPacket = await teams.isNameTaken(req.body.name)
        console.log(isNameTakenPacket)
        isNameTaken = consumeRowDataPacket(isNameTakenPacket)
    }catch(e){
        return res.status(500).send({message: 'Server couldnt check if that team name is taken...'})
    }

    if(isNameTaken === true){return res.status(400).send({message: 'That team name is taken...'})} 
    try{
        await teams.addTeamTransaction(creatorUserId, req.body.name, dateTime, role_id).catch()
        return res.status(200).send({message: `Added ${req.body.name}`})
    } catch(e){
        return res.status(500).send({message: 'Server couldnt add your new team...'})
    }
    
}

module.exports = {
    addTeam
}