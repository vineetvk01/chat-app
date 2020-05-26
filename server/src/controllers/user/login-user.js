
import Logger from '../../logger';
const logger = Logger('[ Login-User :: Controller ]');

export default function makeLoginUser ({ getUser, tokenGenerator, }) {
  return async function loginUser (httpRequest) {
    try {
      logger.info(' New Login request from user', httpRequest.path, httpRequest.method);

      const { source = {}, ...userInfo } = httpRequest.body;

      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers['User-Agent'];
      if (httpRequest.headers.Referer) {
        source.referrer = httpRequest.headers.Referer;
      }

      logger.debug('\n (a) Source :', source, '\n (b) User-Info :', userInfo);

      const user = await getUser.getUserByCredentials({
        ...userInfo,
        source,
      });

      delete user.password;

      const token = tokenGenerator({
        ...user,
      });
      // delete userAdded.password;

      logger.info('Token is generated and will be added to the header');

      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString(),
        },
        cookies: [
          {
            name: 'token',
            value: token,
            config: { maxAge: 86400000, httpOnly: true, },
          }
        ],
        statusCode: 200,
        body: { status: 'success', user, },
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
