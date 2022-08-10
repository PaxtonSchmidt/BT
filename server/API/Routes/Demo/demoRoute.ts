import * as express from 'express';
let router = express.Router();
let demo = require('../../Controllers/SessionManagement/NoAuthentication/demo')

router.post("/demoLogin", demo.demoLogin);

module.exports = router