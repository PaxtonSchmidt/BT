import * as express from 'express';
let router = express.Router();

let projectRoute = require("../Controllers/projectController");

router.get("/addProject", projectRoute.addProject);

module.exports = router;
