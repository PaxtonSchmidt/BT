import * as express from 'express';
import { addTeam } from '../Controllers/Authorization/NoAuthorization/newTeam.js'
import { getCurrentUserTeams, getTeamInvites } from '../Controllers/Authorization/NoAuthorization/TeamSelect.js'
import {
    getTeammatesInformation,
    getTeamDetails,
    inviteUserToTeam,
    putUpdateTeammateRole,
    RemoveTeammateFromTeam
} from '../Controllers/Authorization/teamAuthorization.js'
import { acceptInvite, deleteInvite } from '../Controllers/Authorization/NoAuthorization/teamInvites.js'
import { getInvites } from '../Controllers/Authorization/NoAuthorization/teamInvites.js'

let router = express.Router();
router.get("/getTeams", getCurrentUserTeams);
router.get('/getTeamInvites', getTeamInvites)
router.get('/getTeammatesInformation', getTeammatesInformation)
router.get('/getTeamDetails', getTeamDetails)
router.get('/getTeamInvites', getInvites)

router.post("/addTeam", addTeam);
router.post("/inviteUserToTeam", inviteUserToTeam);
router.post('/acceptInvite', acceptInvite);

router.put('/putUpdateTeammateRole', putUpdateTeammateRole)

router.delete('/removeTeammate', RemoveTeammateFromTeam)
router.delete("/deleteInvite", deleteInvite)

export { router };
