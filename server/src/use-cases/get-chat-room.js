import crypto from 'crypto';
import makeChatRoom from '../ChatRoom';
// Logger
import Logger from '../logger';
const logger = Logger('[ Get-Chat-Room :: Use-Case ]');

function md5 (text) {
  return crypto
    .createHash('md5')
    .update(text, 'utf-8')
    .digest('hex');
};

export default function makeGetChatRoom ({ chatRoomDb, }) {
  return async function getChatRoom (fromUserId, toUserId) {

    if(fromUserId== null || toUserId== null) return;
    
    logger.info('getting the chat room');
    const usersInChatRoom = [];
    usersInChatRoom.push(fromUserId);
    usersInChatRoom.push(toUserId);
    const chatUnhashed = usersInChatRoom.sort().join('');
    const chatHash = md5(chatUnhashed);

    logger.info('Created Chat hash : ', chatHash);
    const chatRoomExists = await chatRoomDb.findByHash(chatHash);

    if (chatRoomExists) {
      logger.info('Chat Room found', chatRoomExists);
      return chatRoomExists;
    }

    logger.info('Creating a new Chat room');
    const newChatRoom = makeChatRoom({fromUserId, toUserId});
    const persistedChatRoom = await chatRoomDb.insert({
      id : newChatRoom.getId(),
      users : newChatRoom.getUsers(),
      hash: newChatRoom.getHash(),
      createdOn : newChatRoom.getCreatedOn(),
    });
    return persistedChatRoom;
  };
}
