import * as express from 'express';
let router = express.Router();

let teamRoute = require("../Queries/teamQueries");
let teamSelectRoute = require("../Controllers/Authorization/NoAuthorization/TeamSelect");
let teamAuthorization = require('../Controllers/Authorization/teamAuthorization');
let NoAuthorizationInvites = require('../Controllers/Authorization/NoAuthorization/teamInvites')


router.post("/addTeam", teamRoute.addTeam);
router.get("/getTeams", teamSelectRoute.getCurrentUserTeams);
router.get('/getTeamInvites', teamSelectRoute.getTeamInvites)

router.post("/inviteUserToTeam", teamAuthorization.inviteUserToTeam);
router.post('/acceptInvite', NoAuthorizationInvites.acceptInvite);
router.delete("/deleteInvite", NoAuthorizationInvites.deleteInvite)


module.exports = router;
