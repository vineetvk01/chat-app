import buildMakeChatRoom from './chatroom.entity';
import Id from '../Id';
import crypto from 'crypto';

const makeChatRoom = buildMakeChatRoom({ Id, md5, });

export default makeChatRoom;


function md5 (text) {
  return crypto
    .createHash('md5')
    .update(text, 'utf-8')
    .digest('hex');
};
