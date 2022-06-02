import * as express from 'express';
let router = express.Router();
let selectTeamRoute = require('../../Controllers/Authentication/selectTeamAuthentication');

router.post('/selectTeam', selectTeamRoute.selectTeam);

module.exports = router;
