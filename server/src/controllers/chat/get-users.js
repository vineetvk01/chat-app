
import Logger from '../../logger';
const logger = Logger('[ Chat/Get-Users :: Controller ]');

export default function makeGetUserProfile ({ getAllUsers }) {
  return async function getUserProfile (httpRequest) {
    try {
      logger.info('Getting All Users of application');

      const { source = {}, } = httpRequest.body;
      const { user, } = httpRequest;

      logger.debug(user);

      if(!user){
        throw new Error('User not logged in')
      }

      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers['User-Agent'];
      if (httpRequest.headers.Referer) {
        source.referrer = httpRequest.headers.Referer;
      }

      logger.debug('\n (a) Source :', source);

      const allUsers = await getAllUsers();

      const chatUsers = allUsers.filter(chatUser =>{
        if(chatUser.id === user.id) return false;
        return true;
      })

      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString(),
        },
        statusCode: 200,
        body: {
          users: chatUsers,
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
