import * as express from 'express';
let router = express.Router();

let authenticationMiddlewareRoutes = require('../../Controllers/Authentication/NoAuthentication/loginAuthentication');
let authenticationQueries = require('../../Queries/AuthQueries/authenticationQueries');

router.post('/login', authenticationMiddlewareRoutes.login);
router.get('/currentUser', authenticationQueries.fetchCurrentUser)

module.exports = router;
