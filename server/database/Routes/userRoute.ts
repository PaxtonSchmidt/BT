import * as express from 'express';
let router = express.Router();

let usersRoute = require("../Controllers/userController");

router.get("/getUsers", usersRoute.getUsers);

module.exports = router;
