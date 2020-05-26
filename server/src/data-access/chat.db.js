
import Id from '../Id';

export default function makeChatDb({ makeDb, }) {
  return Object.freeze({
    findChatRoom,
    insert,
    findByHash,
    findById,
    addMessage,
    markThreadRead,
  });

  async function findChatRoom(userA, userB) {
    const db = await makeDb();
    const result = await db.collection('chatroom').find({ userA });
    const allUsers = await result.toArray();
    const filteredUsers = allUsers.map(user => {
      delete user.password;
      delete user.createdOn;
      const { _id: id, ...userInfo } = user;
      return { id, ...userInfo };
    })
    return filteredUsers;
  }

  async function insert({ id: _id = Id.makeId(), ...chatInfo }) {
    const db = await makeDb();
    const result = await db.collection('chats').insertOne({ _id, ...chatInfo, messages: [] });
    const { _id: id, ...insertedInfo } = result.ops[0];
    return { id, ...insertedInfo, };
  }

  async function findByHash(hash) {
    const db = await makeDb();
    const found = await db.collection('chats').findOne({ hash });

    if (found == null) return;
    const { _id: id, ...chatInfo } = found;
    return { id, ...chatInfo };
  }

  async function findById(chatId) {
    const db = await makeDb();
    
    const found = await db.collection('chats').findOne({ _id : chatId });
    
    if (!found) return;
    const { _id: id, ...chatInfo } = found;
    return { id, ...chatInfo };
  }

  async function addMessage(chatId, message) {
    const db = await makeDb();
    const found = await db.collection('chats').findOne({ _id: chatId });
    const messages = [...found.messages];

    const _message = { 
      id: message.getId(),
      type: message.getType(),
      data: {
        text: message.getMessage(),
      },
      createdOn: message.getCreatedOn(),
      fromId: message.getFrom(),
      seenBy: message.getSeenBy()
    };
    
    messages.push(_message);
    await db.collection('chats').findOneAndUpdate({ _id: chatId }, { $set: { "messages" : messages } });
    return _message;
  }

  async function markThreadRead({chatRoomId, userWhoRead}){
    const db = await makeDb();
    const found = await db.collection('chats').findOne({ _id: chatRoomId });
    const messages = [...found.messages];

    const _messages = messages.map((message) =>{
      const { seenBy } = message;
      seenBy[userWhoRead] = 1;
      return message;
    })

    
    await db.collection('chats').findOneAndUpdate({ _id: chatRoomId }, { $set: { "messages" : _messages } });
  }
}
