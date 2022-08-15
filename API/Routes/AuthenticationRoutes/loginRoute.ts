import * as express from 'express';

let router = express.Router();

import { login } from '../../Controllers/SessionManagement/NoAuthentication/logAuthentication.js'

router.post('/login', login);

export { router };
