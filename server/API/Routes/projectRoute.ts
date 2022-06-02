import * as express from 'express';
let router = express.Router();

let projectRoute = require("../Queries/projectQueries");

router.post("/addProject", projectRoute.addProject);

module.exports = router;
