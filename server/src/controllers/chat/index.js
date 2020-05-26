import {
  getAllUsers,
  getUser
} from '../../use-cases';

import makeGetAllUsers from './get-users';
import makeSendChat from './send-chat';
import makegetChatUserInfo from './get-single-user';

export const getAllChatUsers = makeGetAllUsers({ getAllUsers, });
export const sendChatToUser = makeSendChat({ getUser, });
export const getChatUserInfo = makegetChatUserInfo({ getUser, });

