
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes/api');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ // Middleware
    extended: true
}));

app.use(express.json());

app.use('/api', apiRouter);

app.use(cookieParser());

module.exports = app;
