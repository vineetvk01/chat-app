
import Logger from '../../logger';
const logger = Logger('[ Logout-User :: Controller ]');

export default function makeLoginUser () {
  return async function loginUser (httpRequest) {
    try {
      logger.info(' New Logout request from user');

      const { source = {}, } = httpRequest.body;

      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers['User-Agent'];
      if (httpRequest.headers.Referer) {
        source.referrer = httpRequest.headers.Referer;
      }

      logger.debug('\n (a) Source :', source);

      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString(),
        },
        cookies: [
          {
            name: 'token',
            revoke: true,
          }
        ],
        statusCode: 204,
        body: {},
      };
    } catch (e) {
      // TODO: Error logging
      logger.error(e);

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }
  };
}
