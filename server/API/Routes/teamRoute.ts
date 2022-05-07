import * as express from 'express';
let router = express.Router();

let teamRoute = require("../Controllers/teamController");

router.get("/addTeam", teamRoute.addTeam);

module.exports = router;
