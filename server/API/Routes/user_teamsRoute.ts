import * as express from 'express';
let router = express.Router();
let teamRole = require('../Models/Request/Authorization/teamRoles')

router.post("/inviteUserToTeam", teamRole.inviteUserToTeam);

module.exports = router;
