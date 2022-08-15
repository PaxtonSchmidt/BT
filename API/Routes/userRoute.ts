import * as express from 'express';
import { getSessionState } from '../Controllers/Authorization/NoAuthorization/sessionState.js'
let router = express.Router();
router.get('/getSessionState', getSessionState)

export { router };
