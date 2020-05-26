import app from './app';
import http from 'http';
import socketIO from 'socket.io';
import constants from './constants';
import sockets from './socket';

import Logger from './logger';
const logger = Logger('[ www : Initalizing ] ');

/**
 * Listen on provided port, on all network interfaces.
 */

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const port = normalizePort(constants.PORT || '4000');

const server = http.createServer(app);
const io = socketIO(server);

sockets(io);

server.listen(port, () => {
  logger.info('Server listening on port ' + port);
});
