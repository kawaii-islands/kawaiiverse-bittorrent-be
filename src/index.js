const mongoose = require('mongoose');
const app = require('./app');
const http = require('http');
const config = require('./config/init');
const logger = require('./config/logger');
const socketIO = require('socket.io');

let server = http.createServer(app);
let io = socketIO(server, {
    cors: {
        origin: '*',
    },
});

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    logger.info('Connected to MongoDB');
    io.on('connection', (socket) => {
        console.log('New user connected');
    });
    server = server.listen(config.port, () => {
        logger.info(`Listening to port ${config.port}`);
    });
});

app.io = io;

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = error => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
