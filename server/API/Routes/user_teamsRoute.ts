import * as express from 'express';
let router = express.Router();
let teamAuthorization = require('../Requests/Authorization/teamAuthorization')

router.post("/inviteUserToTeam", teamAuthorization.inviteUserToTeam);

module.exports = router;
