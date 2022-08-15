import * as express from 'express';
let router = express.Router();

import { getTickets, submitNewTicket } from '../Controllers/Authorization/projectAuthorization.js'
import { getTicketNotes, submitTicketComment, putEditTicket } from '../Controllers/Authorization/ticketAuthorization.js'

router.get("/getTickets", getTickets);
router.post("/getTicketNotes", getTicketNotes);

router.post("/addTicket", submitNewTicket);
router.post("/addTicketComment", submitTicketComment);

router.put("/putEditTicket", putEditTicket)

export { router };
