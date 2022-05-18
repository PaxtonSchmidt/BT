const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/', require('./API/Routes/AuthRoutes/authenticationRoute'));
app.use('/signup/', require('./API/Routes/signUpRoute'));
app.use('/users/', require('./API/Routes/userRoute'));
app.use('/tickets/', require('./API/Routes/ticketRoute'));
app.use('/teams/', require('./API/Routes/teamRoute'));
app.use('/projects/', require('./API/Routes/projectRoute'));
app.use('/manageTeam/', require('./API/Routes/user_teamsRoute'));

app.listen('4000', () => {
    console.log('server started on port 4000');
})