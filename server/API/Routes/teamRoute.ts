import * as express from 'express';
let router = express.Router();

let teamRoute = require("../Controllers/teamController");
let teamSelectRoute = require("../Requests/Authorization/NoAuthorization/TeamSelect");
let teamAuthorization = require('../Requests/Authorization/teamAuthorization');
let NoAuthorizationInvites = require('../Requests/Authorization/NoAuthorization/teamInvites')


router.post("/addTeam", teamRoute.addTeam);
router.get("/getTeams", teamSelectRoute.getCurrentUserTeams);
router.get('/getTeamInvites', teamSelectRoute.getTeamInvites)

router.post("/inviteUserToTeam", teamAuthorization.inviteUserToTeam);
router.post('/acceptInvite', NoAuthorizationInvites.acceptInvite);
router.delete("/deleteInvite", NoAuthorizationInvites.deleteInvite)


module.exports = router;
