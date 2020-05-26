import crypto from 'crypto';
import makeChatRoom from '../ChatRoom';
// Logger
import Logger from '../logger';
const logger = Logger('[ Mark-Message-As-Read :: Use-Case ]');

function md5 (text) {
  return crypto
    .createHash('md5')
    .update(text, 'utf-8')
    .digest('hex');
};

export default function makeMarkMessageAsRead ({ chatRoomDb, }) {
  return async function markMessageAsRead (chatRoomId, userWhoRead) {

    chatRoomDb.markThreadRead({chatRoomId, userWhoRead});
    
  };
}
