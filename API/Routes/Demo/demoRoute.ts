import * as express from 'express';

let router = express.Router();

import { demoLogin } from '../../Controllers/SessionManagement/NoAuthentication/demo.js'

router.post("/demoLogin", demoLogin);

export { router }