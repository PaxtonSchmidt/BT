import * as express from 'express';
let router = express.Router();
let selectTeamRoute = require('../../Models/Request/Authentication/selectTeamAuthentication');

router.post('/selectTeam', selectTeamRoute.selectTeam);

module.exports = router;
