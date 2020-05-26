
// Logger
import Logger from '../logger';
const logger = Logger('[ Get-User :: Use-Case ]');

export default function makeGetUser ({ userDb, }) {
  const getUserByCredentials =  async function (userInfo) {
    logger.info(' Going to make User using user info');

    const { email, password, } = userInfo;

    const userExists = await userDb.findByCredentials({ email, password, });

    if (userExists) {
      logger.info('User found with existing credentials, Returning the user');
      return userExists;
    }

    logger.warn('Wrong email or password combination', userInfo);
    throw new Error('Wrong email or password combination');
  };

  const getUserById =  async function ({id}) {
    logger.info(' Getting User using id', id);

    const userExists = await userDb.findById(id);

    if (userExists) {
      logger.info('User found with existing credentials, Returning the user', userExists);
      return userExists;
    }

    logger.warn('User doesn\'t exists, value : ', userInfo);
    throw new Error('User doesn\'t exists');
  };

  return { 
    getUserByCredentials,
    getUserById,
  }
}
