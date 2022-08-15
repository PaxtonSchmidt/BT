import * as express from 'express';

let router = express.Router();

import { logout } from '../../Controllers/SessionManagement/NoAuthentication/logAuthentication.js'

router.post('/logout', logout);

export { router };
