import * as express from 'express';
let router = express.Router();
let userTeamsRoute = require("../Controllers/user_teamsController");

router.post("/addUserToTeam", userTeamsRoute.addUserToTeam);

module.exports = router;
