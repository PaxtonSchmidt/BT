import * as express from 'express';
let router = express.Router();

let projectAuth = require("../Controllers/Authorization/projectAuthorization");

router.get("/getTickets", projectAuth.getTickets);
router.post("/addTicket", projectAuth.submitNewTicket);

module.exports = router;
