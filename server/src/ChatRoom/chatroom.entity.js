export default function buildMakeChatRoom ({ Id, md5 }) {
  return function makeChatRoom ({
    id = Id.makeId(),
    fromUserId,
    toUserId,
    createdOn = Date.now(),
  } = {}) {
    
    let hash;
    return Object.freeze({
      getId: () => id,
      getHash: () => hash || (hash = makeHash()),
      getUsers: () => [fromUserId, toUserId].sort(),
      getCreatedOn: () => createdOn,
    });

    function makeHash () {
      const usersInChat = [];
      usersInChat.push(fromUserId);
      usersInChat.push(toUserId);
      const unHashedId = usersInChat.sort().join('')
      return md5(unHashedId);
    }
  };
}
