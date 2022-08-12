import * as express from 'express';
import { signUp } from '../Controllers/SignUp.js'

let router = express.Router();
router.post('/signup', signUp);

export { router };
