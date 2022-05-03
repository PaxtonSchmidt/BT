const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cors());
app.use("/users/", require("./API/Routes/userRoute"));
app.use("/tickets/", require("./API/Routes/ticketRoute"));

app.listen('4000', () => {
    console.log('server started on port 4000');
})