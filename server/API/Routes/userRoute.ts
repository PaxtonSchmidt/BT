import * as express from 'express';
let router = express.Router();
let sessionRoute = require('../Controllers/Authorization/NoAuthorization/sessionState')
router.get('/getSessionState', sessionRoute.getSessionState)



// //userTable queries
// app.get('/createUserTable', usersTableQueries.createUsersTable);
// app.get('/addUser', usersTableQueries.addUser);
// app.get('/getUserByID', usersTableQueries.getUserByID);

module.exports = router;
