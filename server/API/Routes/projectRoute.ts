import * as express from 'express';
let router = express.Router();
let teamAuthorization = require('../Controllers/Authorization/teamAuthorization')
let projectAuthorization = require('../Controllers/Authorization/projectAuthorization')

router.post("/addProject", teamAuthorization.addProject);

router.get('/getProjectsStatistics', projectAuthorization.getProjectsStatistics)
router.get('/getRelatedMemberDetails', projectAuthorization.getRelatedMemberDetails)
router.get('/getUsersOnTeam', projectAuthorization.getUsersOnTeam)

router.put('/updateMemberRole', projectAuthorization.updateMemberRole)

router.delete('/removeMember', projectAuthorization.removeMember)

module.exports = router;
