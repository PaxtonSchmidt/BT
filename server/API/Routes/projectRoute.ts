import * as express from 'express';
let router = express.Router();

let projectRoute = require("../Controllers/projectController");

router.post("/addProject", projectRoute.addProject);

module.exports = router;
