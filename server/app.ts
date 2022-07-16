import authenticateRequest from "./API/Middleware/authenticateRequest";
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http')
const { Server } = require('socket.io')
app.use(cors());

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']
    }
})

server.listen('4000', () => {
    console.log('server started on port 4000');
})


io.on("connection", (socket: any) => {
    console.log(socket.id)
    socket.conn.on("upgrade", () =>{
        console.log('upgraded')
    })
})

app.use(express.json());
app.use('/', require('./API/Routes/AuthenticationRoutes/authenticationRoute'));
app.use('/signup/', require('./API/Routes/signUpRoute'));

//Protected routes have Auth middleware
app.use('/selectTeam/', authenticateRequest,
    require('./API/Routes/AuthenticationRoutes/teamSelectRoute'))

app.use('/teams/', authenticateRequest,
    require('./API/Routes/teamRoute'));

app.use('/users/', authenticateRequest,
    require('./API/Routes/userRoute'));

app.use('/tickets/', authenticateRequest,
    require('./API/Routes/ticketRoute'));

app.use('/projects/', authenticateRequest,
    require('./API/Routes/projectRoute'));
    
