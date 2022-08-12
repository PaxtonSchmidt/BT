import * as express from 'express';
import { addProject } from '../Controllers/Authorization/teamAuthorization.js'
import { 
    addListOfMembersToProject, 
    addProjectComment, 
    getProjectsStatistics,
    getRelatedMemberDetails,
    getUsersOnTeam,
    getProjectComments,
    updateMemberRole,
    removeMember
} from '../Controllers/Authorization/projectAuthorization.js'

let router = express.Router();
router.post("/addProject", addProject);
router.post("/addListOfMembersToProject", addListOfMembersToProject);
router.post("/addProjectComment", addProjectComment)

router.get('/getProjectsStatistics', getProjectsStatistics)
router.get('/getRelatedMemberDetails', getRelatedMemberDetails)
router.get('/getUsersOnTeam', getUsersOnTeam)
router.get("/getProjectComments", getProjectComments)

router.put('/updateMemberRole', updateMemberRole)

router.delete('/removeMember', removeMember)

export { router };
