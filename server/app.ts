const express = require('express');
const cors = require('cors');
const usersTableQueries = require('./database/Controllers/userController');
const ticketsTableQueries = require('./database/Controllers/ticketController');
const teamsTableQueries = require('./database/Controllers/teamController');
const userTeamsTableQueries = require('./database/Controllers/user_teamsController');
const TicketCommentsTableQueries = require('./database/Controllers/ticket_commentController');
const app = express();

app.use(cors());
app.use("/users/", require("./database/Routes/userRoute"));
app.use("/tickets/", require("./database/Routes/ticketRoute"));



//ticketsTable queries
app.get('/createTicketsTable', ticketsTableQueries.createTicketsTable);
app.get('/addTicket', )

//teamsTable qeuries
app.get('/createTeamsTable', teamsTableQueries.createTeamsTable);

//userTeamsTable qeuries
app.get('/createUserTeamsTable', userTeamsTableQueries.createUserTeamsTable);

//ticketCommentsTable qeuries
app.get('/createTicketCommentsTable', TicketCommentsTableQueries.createTicketCommentsTable);



app.listen('4000', () => {
    console.log('server started on port 4000');
})