/* eslint-disable no-buffer-constructor */
/**
 * Module dependencies.
 */
require('module-alias/register');
require('dotenv').config({ path: './' });

const http = require('http');
const mongoose = require('mongoose');
const request = require('request');
const app = require('./app');

/**
 * PROXY
 */


const fixieRequest = request.defaults({ 'proxy': process.env.QUOTAGUARDSTATIC_URL });

fixieRequest('http://www.example.com', (err, res, body) => {
    console.log(`Got response: ${res.statusCode}`);
});


/**
 * Get environment variables from .env file.
 */

const port = process.env.PORT || 3030;
const mongoDbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bst';

/**
 * Connect to MongoDB database.
 */

// mongoose.connect(`${mongoDbUri}/${mongoDbDatabase}`, { useNewUrlParser: true, useFindAndModify: false }, (err) => {
mongoose.connect(`${mongoDbUri}`, { useNewUrlParser: true, useFindAndModify: false }, (err) => {
    if (err) {
        console.log(`Error trying to connect to db: ${mongoDbUri}`);
        console.log(err);
    } else {
        console.log(`Connected to db: ${mongoDbUri}`);
    }
});


/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
console.log(`Listening on port: ${port}`);
