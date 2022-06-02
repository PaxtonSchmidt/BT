import * as express from 'express';
let router = express.Router();

let authenticationMiddlewareRoutes = require('../../Requests/Authentication/loginAuthentication');
let authenticationController = require('../../Queries/AuthQueries/authenticationQueries');

router.post('/login', authenticationMiddlewareRoutes.login);
router.get('/loginUser', authenticationController.fetchCurrentUser)

module.exports = router;
