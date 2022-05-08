import * as express from 'express';
let router = express.Router();

let teamRoute = require("../Controllers/teamController");
let userTeamsRoute = require("../Controllers/user_teamsController");

router.get("/addTeam", teamRoute.addTeam);

router.get("/addUserToTeam", userTeamsRoute.addUserToTeam);

module.exports = router;
