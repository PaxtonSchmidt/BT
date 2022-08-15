//server
import express from 'express'
import cors from 'cors';
import http from 'http';
import path from 'path';
import {fileURLToPath} from 'url';
import dotenv from 'dotenv'
//SocketIO to be moved 
import { Server } from 'socket.io'
import { ProjectNote } from './API/Interfaces/ProjectNote.js';
import { TicketNote } from './API/Interfaces/TicketNote.js';
import { authenticateRequest } from './API/Middleware/authenticateRequest.js';
import consumeCookie from './API/Services/consumeCookies/consumeCookie.js';
import { consumeCookieFlags } from './API/Services/consumeCookies/consumeCookieFlags.js';
import { consumeRowDataPacket } from './API/Services/consumeRowDataPacket.js';
import { getValidTokenVersion } from './API/Queries/userQueries.js';
import { isUserOnProject } from './API/Queries/projectQueries.js';
//middlewares
import demoCheckpoint from './API/Middleware/demoCheckpoint.js';
import authenticateJWT from './API/Services/authenticateJWT.js';
//routes
import { router as SignUp }  from './API/Routes/signUpRoute.js'
import { router as DemoRoutes }  from './API/Routes/Demo/demoRoute.js'
import { router as LoginRoute }  from './API/Routes/AuthenticationRoutes/loginRoute.js'
import { router as LogoutRoute }  from './API/Routes/AuthenticationRoutes/logoutRoute.js'
import { router as TeamSelect }  from './API/Routes/AuthenticationRoutes/teamSelectRoute.js'
import { router as TeamRoutes }  from './API/Routes/teamRoute.js'
import { router as UserRoutes }  from './API/Routes/userRoute.js'
import { router as TicketRoutes }  from './API/Routes/ticketRoute.js'
import { router as ProjectRoutes }  from './API/Routes/projectRoute.js'


const app = express();
dotenv.config()
app.use(cors());
//a
const PORT: any =  process.env.PORT

const server = http.createServer(app);
server.listen(PORT, () => {console.log(`Listening on port ${PORT}`)});
app.use(express.json());


app.use('/signup/', SignUp);
app.use('/demo/', DemoRoutes)//demo landing 
app.use('/', LoginRoute);
//demo routes are protected by demoCheckpoint
app.use('/logout', demoCheckpoint, LogoutRoute);
//Protected routes have Auth middleware
app.use('/selectTeam/', authenticateRequest, demoCheckpoint, TeamSelect);
app.use('/teams/', authenticateRequest, demoCheckpoint, TeamRoutes);
app.use('/users/', authenticateRequest, demoCheckpoint, UserRoutes);
app.use('/tickets/', authenticateRequest, demoCheckpoint, TicketRoutes);
app.use('/projects/', authenticateRequest, demoCheckpoint, ProjectRoutes);

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
        let isUserOnProjectBool = consumeRowDataPacket(
          await isUserOnProject(tokenInformation.userID, project_id)
          );
          if (isUserOnProjectBool) {
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
              let isUserOnProjectBool = consumeRowDataPacket(
                await isUserOnProject(tokenInformation.userID, project_id)
                );
                if (isUserOnProjectBool || tokenInformation.roleID === 1) {
                  socket.join(`project:${project_id}`);
                } else {
                  new Error('Cant connect to chat for lack of perms...');
                }
              }
              );
              socket.on('newTicketNote', (ticketNote: TicketNote) => {
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
                    validTokenVersion = await getValidTokenVersion(userId);
                  } catch (e) {
                    next(new Error('Couldnt validate user...'));
                  }

                  if (
                    tokenVersion !== validTokenVersion.token_v ||
                    authenticateJWT(token) !== true
                    ) {
                      next(new Error('Invalid connection request...'));
                    } 
                    else {
                      next();
                    }
                  } else {
                  next(new Error('Please send token...'));
                  }
                }
              );
                
  if(process.env.NODE_ENV === 'production'){
    const __fileName = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__fileName)
    app.use(express.static(path.join(__dirname, 'client/build')))
    app.get('*', function(req: any, res: any){
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    })
  }
