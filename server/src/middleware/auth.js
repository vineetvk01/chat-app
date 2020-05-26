import jwt from 'jsonwebtoken';

import Logger from '../logger';
const logger = Logger('[ Auth | Middleware ]');

const authentication = async (req, res, next) => {
  logger.info('Authentication is being checked');
  try {
    if (req.headers.cookie) {
      const cookieArray = req.headers.cookie
        .split(';')
        .filter((cookie) => cookie.indexOf('token') !== -1);
      if (cookieArray.length > 0) {
        logger.info('Found TOKEN cookie attached in headers');
        const token = cookieArray[0].split('=')[1];

        if (!token) {
          logger.info('No Found TOKEN cookie attached in headers');
          res.status(401).send({
            error: 'Not authorized to access this resource, no token',
          });
        } else {
          const data = await jwt.verify(token, process.env.JWT_KEY);
          req.user = data;
          logger.info('User found in request -> Verified');
        }
      }
    } else {
      logger.info('No cookie found in the headers');
    }
    logger.info('--> Sending to next()');
    next();
  } catch (error) {
    if(error.name === 'JsonWebTokenError'){
      res.clearCookie('token', { });
    }
    res.status(401).send({ error: 'Not authorized to access this resource', });
  }
};

export default authentication;
