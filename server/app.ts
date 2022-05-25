import authenticateRequest from "./API/Middleware/authenticateRequest";

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/', require('./API/Routes/AuthenticationRoutes/authenticationRoute'));
app.use('/signup/', require('./API/Routes/signUpRoute'));

//Protected routes have Auth/Auth middlewares
app.use('/selectTeam/', authenticateRequest, authenticateRequest,
    require('./API/Routes/AuthenticationRoutes/teamSelectRoute'))

app.use('/teams/', authenticateRequest,
    require('./API/Routes/teamRoute'));

app.use('/users/', authenticateRequest,
    require('./API/Routes/userRoute'));

app.use('/tickets/', authenticateRequest,
    require('./API/Routes/ticketRoute'));

app.use('/projects/', authenticateRequest,
    require('./API/Routes/projectRoute'));

app.use('/manageTeam/', authenticateRequest,
    require('./API/Routes/user_teamsRoute'));

    
app.listen('4000', () => {
    console.log('server started on port 4000');
})