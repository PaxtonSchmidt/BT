import * as express from 'express';
let router = express.Router();

let signUpRoute = require('../Queries/AuthQueries/signUpQueries');

router.post('/signup', signUpRoute.signUp);

module.exports = router;