import makeUser from '../User';

//Logger
import Logger from '../logger';
const logger = Logger('[ Add-User :: Use-Case ]');

export default function makeAddUser ({ userDb, }) {
  return async function addUser (userInfo) {
    logger.info(' Going to make User using user info');

    const user = makeUser(userInfo);
    const userExists = await userDb.findByEmail({ email: user.getEmail(), });

    if (userExists) {
      logger.error(' User already exists in database, returning the same');
      throw new Error('This email already registered with us');
    }

    logger.info(' Going Insert user into database ');
    return userDb.insert({
      id: user.getId(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      createdOn: user.getCreatedOn(),
      email: user.getEmail(),
      isActive: true,
      password: user.getPassword(),
    });
  };
}
