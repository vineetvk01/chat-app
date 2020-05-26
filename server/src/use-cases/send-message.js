import makeMessage from '../Message';

// Logger
import Logger from '../logger';
const logger = Logger('[ Send-Message :: Use-Case ]');

export default function makeSendMessage ({ chatRoomDb }) {
  return async function sendMessage({fromId, toId, chatRoomId, data, type}) {

    logger.info('getting the chat room with id : ', chatRoomId);

    const chatRoomExists = await chatRoomDb.findById(chatRoomId);
    console.log('This is the chatRoom Value: ', chatRoomExists);
    if(!chatRoomExists) throw new Error('No Chat Room Exists. Unable to persist the message');

    
    const messageObj = makeMessage({type, message: data.message, from: fromId });
    const message = await chatRoomDb.addMessage(chatRoomId, messageObj);
    return message;
  };

}
