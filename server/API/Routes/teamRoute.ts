import * as express from 'express';
let router = express.Router();

let teamRoute = require("../Queries/teamQueries");
let teamSelectRoute = require("../Controllers/Authorization/NoAuthorization/TeamSelect");
let teamAuthorization = require('../Controllers/Authorization/teamAuthorization');
let NoAuthorizationInvites = require('../Controllers/Authorization/NoAuthorization/teamInvites')


router.get("/getTeams", teamSelectRoute.getCurrentUserTeams);
router.get('/getTeamInvites', teamSelectRoute.getTeamInvites)
router.get('/getTeammates', teamAuthorization.getTeammates)
router.get('/getTeammatesInformation', teamAuthorization.getTeammatesInformation)
router.get('/getTeamDetails', teamAuthorization.getTeamDetails)

router.post("/addTeam", teamRoute.addTeam);
router.post("/inviteUserToTeam", teamAuthorization.inviteUserToTeam);
router.post('/acceptInvite', NoAuthorizationInvites.acceptInvite);

router.put('/putUpdateTeammateRole', teamAuthorization.putUpdateTeammateRole)

router.delete('/removeTeammate', teamAuthorization.RemoveTeammateFromTeam)
router.delete("/deleteInvite", NoAuthorizationInvites.deleteInvite)

module.exports = router;
