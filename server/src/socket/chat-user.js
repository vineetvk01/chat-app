import { sendMessage, getChatRoom, markMessageAsRead } from '../use-cases';

import Logger from '../logger';
const logger = Logger('[ Sockets :: Manager ]');

const chatCache = {};

async function getChatIdForUsers(fromId, toId) {
  if(fromId == null || toId == null) throw new Error('No Id specified...')
  const key = [fromId, toId].sort().join('');
  if (!chatCache[key]) {
    let chatRoom = await getChatRoom(fromId, toId);
    chatCache[key] = chatRoom.id;
    return chatRoom.id;
  }
  return chatCache[key];
}

const chatPipeline = (socket, io, onlineUsers) => {

  logger.info('A new user is connected to DM pipeline...')

  socket.on('connect-chat-room', async ({ fromId, toId }) => {

    logger.info('Chat Room id for : ', fromId, toId);

    const chatRoom = await getChatRoom(fromId, toId);

    socket.join(chatRoom.id);

    if (onlineUsers[toId]) {
      const { socket: toSocket } = onlineUsers[toId];
      toSocket.join(chatRoom.id);
    }

    await getChatIdForUsers(fromId, toId);

    io.of('/chat/user').to(chatRoom.id).emit('chat-room-connected', 'Connected');
  })

  socket.on('new-message', async ({ fromId, toId, ...message }) => {

    logger.info('New Message incoming....')

    let chatRoomId = await getChatIdForUsers(fromId, toId);

    logger.info('Going to persist the message to database....', fromId, toId, chatRoomId, message);

    const messageObj = await sendMessage({ fromId, toId, chatRoomId, ...message });
    console.log('Sending ? ', messageObj);
    io.of('/chat/user').to(chatRoomId).emit('new-message', messageObj);
  })

  socket.on('fetch-latest', async ({ fromId, toId, }) => {
    const chatRoom = await getChatRoom(fromId, toId);
    markMessageAsRead(chatRoom.id, fromId);
    socket.emit('fetched-latest', chatRoom.messages);
  });

  socket.on('user-typing', async ({fromId, toId}) => {

    let chatRoomId = await getChatIdForUsers(fromId, toId);

    io.of('/chat/user').to(chatRoomId).emit('user-typing', { id: fromId, status: true });
  });

  socket.on('mark-as-read', async({fromId, toId}) => {

    let chatRoomId = await getChatIdForUsers(fromId, toId);
    markMessageAsRead(chatRoomId, fromId);
    io.of('/chat/user').to(chatRoomId).emit('mark-as-read', { readByUserId: fromId})

  })
}

export default chatPipeline;