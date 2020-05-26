
import Logger from '../../logger';
const logger = Logger('[ Get-Profile :: Controller ]');

export default function makeGetUserProfile () {
  return async function getUserProfile (httpRequest) {
    try {
      logger.info(' Getting User Profile');

      const { source = {}, } = httpRequest.body;
      const { user, } = httpRequest;

      logger.debug(user);

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
        statusCode: 200,
        body: {
          user,
        },
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
