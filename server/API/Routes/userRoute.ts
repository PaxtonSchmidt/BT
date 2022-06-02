import * as express from 'express';
let router = express.Router();

let usersRoute = require("../Queries/userQueries");

router.get("/getUsers", usersRoute.getUsers);
router.get("/addUser", usersRoute.addUser);
router.get("/getUserByID", usersRoute.getUserByID);



// //userTable queries
// app.get('/createUserTable', usersTableQueries.createUsersTable);
// app.get('/addUser', usersTableQueries.addUser);
// app.get('/getUserByID', usersTableQueries.getUserByID);

module.exports = router;
