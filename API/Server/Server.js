const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const {Products,Sales,Users,Login} = require('../Routes/index.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.use('/', Login);
app.use('/user', Users);
app.use('/product', Products);
app.use('/sale', Sales);

module.exports = app;