import * as express from 'express';
let router = express.Router();
let selectTeamRoute = require('../../Controllers/SessionManagement/selectTeamAuthentication');

router.post('/selectTeam', selectTeamRoute.selectTeam);

module.exports = router;
