import * as express from 'express';
let router = express.Router();

let usersRoute = require("../Queries/userQueries");
let sessionRoute = require('../Controllers/Authorization/NoAuthorization/sessionState')

router.get("/getUsers", usersRoute.getUsers);
router.get("/addUser", usersRoute.addUser);
router.get("/getUserByID", usersRoute.getUserByID);

router.get('/getSessionState', sessionRoute.getSessionState)



// //userTable queries
// app.get('/createUserTable', usersTableQueries.createUsersTable);
// app.get('/addUser', usersTableQueries.addUser);
// app.get('/getUserByID', usersTableQueries.getUserByID);

module.exports = router;
