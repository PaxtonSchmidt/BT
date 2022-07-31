import * as express from 'express';
let router = express.Router();

let signUpRoute = require('../Controllers/SignUp');

router.post('/signup', signUpRoute.signUp);

module.exports = router;