
import Logger from '../../logger';
const logger = Logger('[ Chat/Get-Single-User :: Controller ]');

export default function makeGetUserProfile ({ getUser }) {
  return async function getUserProfile (httpRequest) {
    try {
      const { source = {}, } = httpRequest.body;
      console.log(httpRequest.params)
      const { userid } = httpRequest.params;
      const { user, } = httpRequest;

      logger.info('Getting User with id ', userid);

      logger.debug(user);

      if(!user){
        throw new Error('User not logged in')
      }

      if(!userid){
        throw new Error('UserId is absent in route')
      }

      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers['User-Agent'];
      if (httpRequest.headers.Referer) {
        source.referrer = httpRequest.headers.Referer;
      }

      logger.debug('\n (a) Source :', source);

      const userInfo = await getUser.getUserById({id: userid});

      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString(),
        },
        statusCode: 200,
        body: {
          user: userInfo,
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
