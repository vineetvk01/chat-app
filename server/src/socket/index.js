import allChatsSockets from './all-chats';
import chatWithUser from './chat-user';

const sockets = (io) => {

  const onlineUsers = {};

  io.of('/chats').on('connection', (socket) => allChatsSockets(socket, io, onlineUsers));
  io.of('/chat/user').on('connection', (socket) => chatWithUser(socket, io, onlineUsers));
}

export default sockets;