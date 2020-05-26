
import Logger from '../../logger';
const logger = Logger('[ Chat/Send-Chat :: Controller ]');

export default function makeSendChat ({ getUser }) {
  return async function sendChat (httpRequest) {
    try {
      const { source = {}, message } = httpRequest.body;
      const { user, params : { id } } = httpRequest;
 
      logger.debug(user);
      logger.debug(`Message to be to send to ${id}`);

      if(!user){
        throw new Error('User not logged in')
      }

      const toUser = await getUser.getUserById({id});

      if(!toUser){
        throw new Error('User not found with the id');
      }

      logger.debug(toUser);

      if(user.id === toUser.id){
        throw new Error('Can\'t send message to self');
      }

      logger.debug('message from : ', user.id);
      logger.debug('message to : ', toUser.id);
      logger.debug('message : ', message);

      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers['User-Agent'];
      if (httpRequest.headers.Referer) {
        source.referrer = httpRequest.headers.Referer;
      }

      logger.debug(' (a) Source :', source);

      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString(),
        },
        statusCode: 200,
        body: {
          fromUser: user,
          toUser: toUser,
          message
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
