import * as express from 'express';
let router = express.Router();

let teamRoute = require("../Controllers/teamController");
let teamSelectRoute = require("../Requests/Authorization/NoAuthorization/TeamSelect");
let teamAuthorization = require('../Requests/Authorization/teamAuthorization')


router.post("/addTeam", teamRoute.addTeam);
router.get("/getTeams", teamSelectRoute.getCurrentUserTeams);
router.get('/getTeamInvites', teamSelectRoute.getTeamInvites)

router.post("/inviteUserToTeam", teamAuthorization.inviteUserToTeam);
router.post('/acceptInviteToTeam', teamAuthorization.acceptInviteToTeam);


module.exports = router;
