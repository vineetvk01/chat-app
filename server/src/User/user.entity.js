export default function buildMakeUser ({ Id, md5, validation, sanitize, }) {
  return function makeUser ({
    id = Id.makeId(),
    firstName,
    lastName,
    email,
    password,
    createdOn = Date.now(),
  } = {}) {
    const { isValidEmail, } = validation;
    if (!Id.isValidId(id)) {
      throw new Error('Comment must have a valid id.');
    }
    if (!firstName) {
      throw new Error('First Name is required');
    }
    if (!lastName) {
      throw new Error('Last Name is required');
    }
    if (!email) {
      throw new Error('Email is required');
    }
    if (!isValidEmail(email)) {
      throw new Error('Email is invalid.');
    }

    const sanitizedFirstName = sanitize(firstName).trim();
    const sanitizedLastName = sanitize(lastName).trim();
    const sanitizedEmail = sanitize(email).trim();
    if (sanitizedFirstName.length < 1 && sanitizedLastName.length < 1 && sanitizedEmail.length < 1) {
      throw new Error('Name or email contains no usable value.');
    }

    let hash;
    return Object.freeze({
      getId: () => id,
      getHash: () => hash || (hash = makeHash()),
      getFirstName: () => sanitizedFirstName,
      getLastName: () => sanitizedLastName,
      getCreatedOn: () => createdOn,
      getEmail: () => sanitizedEmail,
      getPassword: () => password,
    });

    function makeHash () {
      return md5(email);
    }
  };
}
