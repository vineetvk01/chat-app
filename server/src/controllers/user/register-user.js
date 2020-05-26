
import Logger from '../../logger';
const logger = Logger('[ Register-User :: Controller ]');

export default function makeRegisterUser ({ addUser, }) {
  return async function registerUser (httpRequest) {
    try {
      logger.info(' New Register user request');

      const { source = {}, ...userInfo } = httpRequest.body;

      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers['User-Agent'];
      if (httpRequest.headers.Referer) {
        source.referrer = httpRequest.headers.Referer;
      }

      logger.debug('\n (a) Source :', source, '\n (b) User-Info :', userInfo);

      delete userInfo.isActive;
      delete userInfo.createdOn;

      const userAdded = await addUser({
        ...userInfo,
        source,
      });

      delete userAdded.password;

      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date(userAdded.modifiedOn).toUTCString(),
        },
        statusCode: 201,
        body: { user: userAdded, },
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
