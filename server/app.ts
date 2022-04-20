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

//userTable queries
app.get('/createUserTable', usersTableQueries.createUsersTable);
app.get('/addUser', usersTableQueries.addUser);
app.get('/getUsers', usersTableQueries.getUsers);
app.get('/getUserByID', usersTableQueries.getUserByID);

//ticketsTable queries
app.get('/createTicketsTable', ticketsTableQueries.createTicketsTable);

//teamsTable qeuries
app.get('/createTeamsTable', teamsTableQueries.createTeamsTable);

//userTeamsTable qeuries
app.get('/createUserTeamsTable', userTeamsTableQueries.createUserTeamsTable);

//ticketCommentsTable qeuries
app.get('/createTicketCommentsTable', TicketCommentsTableQueries.createTicketCommentsTable);



app.listen('4000', () => {
    console.log('server started on port 4000');
})