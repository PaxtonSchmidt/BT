import * as express from 'express';
let router = express.Router();

let ticketRoute = require("../Queries/ticketQueries");

router.get("/getTickets", ticketRoute.getTickets);
router.post("/addTicket", ticketRoute.addTicket);

module.exports = router;
