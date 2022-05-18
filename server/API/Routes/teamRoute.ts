import * as express from 'express';
let router = express.Router();

let teamRoute = require("../Controllers/teamController");
let teamSelectRoute = require("../Models/TeamSelect");

router.get("/addTeam", teamRoute.addTeam);
router.get("/getTeams", teamSelectRoute.getCurrentUserTeams);

module.exports = router;
