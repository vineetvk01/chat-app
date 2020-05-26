
// Logger
import Logger from '../logger';
const logger = Logger('[ Get-All-Users :: Use-Case ]');

export default function makeGetAllUsers ({ userDb, }) {
  return async function getAllUsers () {
    logger.info(' Going to make User using user info');

    const allUsers = await userDb.findAll()

    if (allUsers) {
      logger.info('Users Exists in the database');
      return allUsers;
    }

    logger.warn('No users exists in the database');
    throw new Error('No users exists in the database');
  };
}
