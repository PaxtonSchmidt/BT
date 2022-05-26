import * as express from 'express';
let router = express.Router();

let authenticationMiddlewareRoutes = require('../../Models/Request/Authentication/loginAuthentication');
let authenticationController = require('../../Controllers/AuthControllers/authenticationController');

router.post('/login', authenticationMiddlewareRoutes.login);
router.get('/loginUser', authenticationController.fetchCurrentUser)

module.exports = router;
