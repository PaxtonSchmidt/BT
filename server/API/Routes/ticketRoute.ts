import * as express from 'express';
let router = express.Router();

let ticketRoute = require("../Controllers/ticketController");

router.get("/getTickets", ticketRoute.getTickets);
router.post("/addTicket", ticketRoute.addTicket);

module.exports = router;
