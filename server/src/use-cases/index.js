import makeAddUser from './add-user';
import makeGetUser from './get-user';
import makeGetAllUsers from './get-all-users';
import makeSendMessage from './send-message';
import makeGetChatRoom from './get-chat-room';
import makeMarkMessageAsRead from './mark-message-read';

import { userDb, chatRoomDb } from '../data-access';

export const addUser = makeAddUser({ userDb, });
export const getUser = makeGetUser({ userDb, });
export const getAllUsers = makeGetAllUsers({ userDb, chatRoomDb });
export const getChatRoom = makeGetChatRoom({chatRoomDb});
export const sendMessage = makeSendMessage({chatRoomDb});
export const markMessageAsRead = makeMarkMessageAsRead({chatRoomDb});

