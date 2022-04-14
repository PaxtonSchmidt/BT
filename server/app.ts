const express = require('express');
const queries = require('./database/Tables/userTable');

const app = express();

// app.get('/createdb', createdb);

// app.get('/createUserTable', )

app.get('/addUser', queries.addUser);


app.listen('4000', () => {
    console.log('server started on port 4000');
})