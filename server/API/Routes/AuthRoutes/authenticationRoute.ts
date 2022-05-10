import * as express from 'express';
let router = express.Router();

let authenticationRoutes = require('../../Middleware/Authentication/loginAuthentication');
let authenticationController = require('../../Controllers/AuthControllers/authenticationController')

router.post('/login', authenticationRoutes.login);
router.get('/loginUser', authenticationController.fetchCurrentUser)

module.exports = router;
