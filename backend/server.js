/**
 * Module dependencies.
 */
require('module-alias/register');
require('dotenv').config({ path: './' });

const http = require('http');
const url = require('url');
const mongoose = require('mongoose');
const app = require('./app');

/**
 * PROXY
 */

const proxy = url.parse(process.env.QUOTAGUARDSTATIC_URL);
const target = url.parse('http://ip.jsontest.com/');

const options = {
    hostname: proxy.hostname,
    port: proxy.port || 80,
    path: target.href,
    headers: {
        // eslint-disable-next-line no-buffer-constructor
        'Proxy-Authorization': `Basic ${new Buffer(proxy.auth).toString('base64')}`,
        'Host': target.hostname
    }
};

http.get(options, (res) => {
    res.pipe(process.stdout);
    return console.log('status code', res.statusCode);
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
