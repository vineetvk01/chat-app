
import Logger from '../logger';
const logger = Logger('[ Sockets :: Manager ]');

const removeSocketFromOnlineUsers = (io, socketId, onlineUsers) => {
  const onlineIds = Object.keys(onlineUsers);

  let userIdToDelete;
  onlineIds.forEach((onlineUsersId) => {
    const { socket: userSockets, user } = onlineUsers[onlineUsersId];
    if (userSockets.id === socketId) {
      logger.info('Found the disconnected user : ', user.email, onlineUsersId)
      userIdToDelete = onlineUsersId;
    }
  })

  delete onlineUsers[userIdToDelete];

  console.log(Object.keys(onlineUsers));
  io.sockets.emit('total-online', Object.keys(onlineUsers).length);
}

const AllChatsPipeline = (socket, io, onlineUsers) => {

  logger.info('A New Client made connection...');

  socket.on('new-connection', (user) => {
    if (!user) return;

    const { id, ...userInfo } = user;

    logger.info('Client connected with UserId : ', id, user.email);
    onlineUsers[id] = {
      socket: socket,
      user: userInfo
    }
    const onlineIds = Object.keys(onlineUsers);
    logger.info('Number of Online users : ', onlineIds.length);
    io.of('/chats').emit('total-online', onlineIds.length);
  });

  socket.on('disconnect', () => {
    logger.info('Client disconnected with Id : ', socket.id);
    removeSocketFromOnlineUsers(io, socket.id, onlineUsers);
  })

  socket.on('is-user-online', (userid) => {
    if (onlineUsers[userid]) {
      socket.emit('user-online-status', { id: userid, status: true });
    } else {
      socket.emit('user-online-status', { id: userid, status: false });
    }
  })
}

export default AllChatsPipeline;