export default function buildMakeMessage ({ Id, md5 }) {
  return function makeMessage ({
    id = Id.makeId(),
    type,
    message,
    from,
    seenBy,
    createdOn = Date.now(),
  } = {}) {
    
    seenBy = {};
    seenBy[from] = 1;
    
    return Object.freeze({
      getId: () => id,
      getType: () => type,
      getMessage: () => message,
      getCreatedOn: () => createdOn,
      getFrom: () => from,
      getSeenBy: () => seenBy,
    });

  };
}
