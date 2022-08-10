import * as express from 'express';
let router = express.Router();

let authenticationRoutes = require('../../Controllers/SessionManagement/NoAuthentication/logAuthentication')

router.post('/logout', authenticationRoutes.logout);

module.exports = router;
