import * as express from 'express';
let router = express.Router();

let projectAuth = require("../Controllers/Authorization/projectAuthorization");
let ticketAuth = require("../Controllers/Authorization/ticketAuthorization");

router.get("/getTickets", projectAuth.getTickets);
router.get("/getTicketNotes", ticketAuth.getTicketNotes);

router.post("/addTicket", projectAuth.submitNewTicket);
router.post("/addTicketComment", ticketAuth.submitTicketComment);

module.exports = router;
