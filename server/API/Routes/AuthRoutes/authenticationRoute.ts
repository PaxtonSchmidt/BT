import * as express from 'express';
let router = express.Router();

let authenticationRoutes = require("../../Middleware/Authentication/authenticateLoginClaims");

router.post("/login", authenticationRoutes.login);

module.exports = router;
