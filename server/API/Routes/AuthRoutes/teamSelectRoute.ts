import * as express from 'express';
let router = express.Router();
let selectTeamRoute = require('../../Controllers/AuthControllers/selectTeamAuthentication');

router.post('/selectTeam', selectTeamRoute.selectTeam);

module.exports = router;
