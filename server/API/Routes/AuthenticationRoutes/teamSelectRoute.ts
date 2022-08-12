import * as express from 'express';

import { selectTeam } from '../../Controllers/SessionManagement/selectTeamAuthentication.js'

let router = express.Router();

router.post('/selectTeam', selectTeam);

export { router };
