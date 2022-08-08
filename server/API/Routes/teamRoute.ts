import * as express from 'express';
let router = express.Router();

let newTeamRoute = require('../Controllers/Authorization/NoAuthorization/newTeam')
let teamSelectRoute = require("../Controllers/Authorization/NoAuthorization/TeamSelect");
let teamAuthorization = require('../Controllers/Authorization/teamAuthorization');
let NoAuthorizationInvites = require('../Controllers/Authorization/NoAuthorization/teamInvites')
let inviteRoute = require('../Controllers/Authorization/NoAuthorization/teamInvites')

router.get("/getTeams", teamSelectRoute.getCurrentUserTeams);
router.get('/getTeamInvites', teamSelectRoute.getTeamInvites)
router.get('/getTeammatesInformation', teamAuthorization.getTeammatesInformation)
router.get('/getTeamDetails', teamAuthorization.getTeamDetails)
router.get('/getTeamInvites', inviteRoute.getInvites)

router.post("/addTeam", newTeamRoute.addTeam);
router.post("/inviteUserToTeam", teamAuthorization.inviteUserToTeam);
router.post('/acceptInvite', NoAuthorizationInvites.acceptInvite);

router.put('/putUpdateTeammateRole', teamAuthorization.putUpdateTeammateRole)

router.delete('/removeTeammate', teamAuthorization.RemoveTeammateFromTeam)
router.delete("/deleteInvite", NoAuthorizationInvites.deleteInvite)

module.exports = router;
