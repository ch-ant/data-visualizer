/**
 * MySQL install commands:
 *  npm install mysql
 *  npm install @types/mysql
 *
 * Run js build: node build/server.js
 * Run ts src: nodemon src/server.ts
 */

import http from 'http';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import sampleRoute from './route/sample';
import countryRoute from './route/country';
import measurementRoute from './route/measurement';

const NAMESPACE = 'Server';
const router = express();

/** Logging the request */
router.use((req, res, next) => {
    logging.info(`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });

    next();
});

/** Parse the Request Body*/
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/** API Access Policies */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});

/** Routes */
router.use('/sample', sampleRoute);
router.use('/', countryRoute);
router.use('/', measurementRoute);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');

    return res.status(404).json({
        message: error.message
    });

    next();
});

/** Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(`Server running on http://${config.server.hostname}:${config.server.port}`));
