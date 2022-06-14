import * as express from 'express';
let router = express.Router();

let projectRoute = require("../Queries/projectQueries");
let projectAuthorization = require('../Controllers/Authorization/projectAuthorization')

router.post("/addProject", projectRoute.addProject);
router.get('/getProjectsStatistics', projectAuthorization.getProjectsStatistics)

module.exports = router;
