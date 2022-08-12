import * as Express from 'express';
import consumeCookie from '../../../Services/consumeCookies/consumeCookie.js';
import { consumeCookieFlags } from '../../../Services/consumeCookies/consumeCookieFlags.js';
import { consumeRowDataPacket } from '../../../Services/consumeRowDataPacket.js';
import getCurrentDate from '../../../Services/getCurrentDate.js';

import { isNameTaken, addTeamTransaction } from '../../../Queries/teamQueries.js'

import { Legend } from '../Roles.js';

async function addTeam(req: Express.Request, res: Express.Response) {
  let dateTime = getCurrentDate();
  let creatorUserId = consumeCookie(
    req.headers.cookie,
    consumeCookieFlags.tokenUserIdFlag
  );
  let role_id = Legend.owner;
  let isNameTakenBool: boolean = true;

  try {
    let isNameTakenPacket = await isNameTaken(req.body.name);
    isNameTakenBool = consumeRowDataPacket(isNameTakenPacket);
  } catch (e) {
    return res
      .status(500)
      .send({ message: 'Server couldnt check if that team name is taken...' });
  }

  if (isNameTakenBool === true) {
    return res.status(400).send({ message: 'That team name is taken...' });
  }
  try {
    await addTeamTransaction(creatorUserId, req.body.name, dateTime, role_id)
      .catch();
    return res.status(200).send({ message: `Added ${req.body.name}` });
  } catch (e) {
    return res
      .status(500)
      .send({ message: 'Server couldnt add your new team...' });
  }
}

export {
  addTeam,
};
