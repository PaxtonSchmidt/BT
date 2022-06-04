import * as express from 'express';
let router = express.Router();

let authenticationRoutes = require('../../Controllers/SessionManagement/NoAuthentication/logAuthentication');
let authenticationQueries = require('../../Queries/AuthQueries/authenticationQueries');

router.post('/login', authenticationRoutes.login);
router.post('/logout', authenticationRoutes.logout)
router.get('/currentUser', authenticationQueries.fetchCurrentUser)

module.exports = router;
