import { ProjectNote } from './API/Interfaces/ProjectNote';
import { TicketNote } from './API/Interfaces/TicketNote';
import authenticateRequest from './API/Middleware/authenticateRequest';
import authenticateJWT from './API/Services/authenticateJWT';
import consumeCookie from './API/Services/consumeCookies/consumeCookie';
import { consumeCookieFlags } from './API/Services/consumeCookies/consumeCookieFlags';
import { consumeRowDataPacket } from './API/Services/consumeRowDataPacket';
let users = require('./API/Queries/userQueries');
let projects = require('./API/Queries/projectQueries');
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
app.use(cors());

const server = http.createServer(app);
server.listen('4000', () => {});
app.use(express.json());
app.use('/', require('./API/Routes/AuthenticationRoutes/authenticationRoute'));
app.use('/signup/', require('./API/Routes/signUpRoute'));

//Protected routes have Auth middleware
app.use(
  '/selectTeam/',
  authenticateRequest,
  require('./API/Routes/AuthenticationRoutes/teamSelectRoute')
);

app.use('/teams/', authenticateRequest, require('./API/Routes/teamRoute'));

app.use('/users/', authenticateRequest, require('./API/Routes/userRoute'));

app.use('/tickets/', authenticateRequest, require('./API/Routes/ticketRoute'));

app.use(
  '/projects/',
  authenticateRequest,
  require('./API/Routes/projectRoute')
);

//socketIO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST'],
  },
});
io.on('connection', (socket: any) => {
  socket.on('upgrade', () => {
  });
  socket.on(
    'joinTicket',
    async function (ticket_id: number, project_id: number) {
      let tokenInformation = consumeCookie(
        socket.handshake.headers.cookie,
        consumeCookieFlags.tokenUserTeamRoleIdFlag
      );
      let isUserOnProject = consumeRowDataPacket(
        await projects.isUserOnProject(tokenInformation.userID, project_id)
      );
      if (isUserOnProject) {
        socket.join(ticket_id);
      } else {
        new Error('Cant connect to chat for lack of perms...');
      }
    }
  );
  socket.on(
    'joinProject',
    async function (project_id: number) {
      let tokenInformation = consumeCookie(
        socket.handshake.headers.cookie,
        consumeCookieFlags.tokenUserTeamRoleIdFlag
      );
      let isUserOnProject = consumeRowDataPacket(
        await projects.isUserOnProject(tokenInformation.userID, project_id)
      );
      if (isUserOnProject || tokenInformation.roleID === 1) {
        socket.join(`project:${project_id}`);
      } else {
        new Error('Cant connect to chat for lack of perms...');
      }
    }
  );
  socket.on('newTicketNote', (ticketNote: TicketNote) => {
    console.log('asda')
    socket.to(ticketNote.relevant_ticket_id).emit('newTicketNote', ticketNote);
  });
  socket.on('newProjectNote', (projectNote: ProjectNote) => {
    socket.to(`project:${projectNote.project_id}`).emit('newProjectNote', projectNote);
  });
});

io.use(async (socket: any, next: any) => {
  if (socket.handshake.headers.cookie) {
    let tokenInformation = consumeCookie(
      socket.handshake.headers.cookie,
      consumeCookieFlags.tokenSocketIoFlag
    );
    let tokenVersion = tokenInformation.tokenV;
    let userId = tokenInformation.userID;
    let token = tokenInformation.token;
    let validTokenVersion = { token_v: '' };
    try {
      validTokenVersion = await users.getValidTokenVersion(userId);
    } catch (e) {
      next(new Error('Couldnt validate user...'));
    }

    if (
      tokenVersion !== validTokenVersion.token_v ||
      authenticateJWT(token) !== true
    ) {
      next(new Error('Invalid connection request...'));
    } else {
      next();
    }
  } else {
    next(new Error('Please send token...'));
  }
});
