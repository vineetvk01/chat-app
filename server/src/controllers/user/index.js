import {
  addUser,
  getUser
} from '../../use-cases';
import makeRegisterUser from './register-user';
import makeLoginUser from './login-user';
import makeLogoutUser from './logout-user';
import makeGetUserProfile from './get-profile';

import jwt from 'jsonwebtoken';

const tokenGenerator = (toBeSigned) => {
  return jwt.sign({ ...toBeSigned, }, process.env.JWT_KEY);
};

const registerUser = makeRegisterUser({ addUser, });
const loginUser = makeLoginUser({ getUser, tokenGenerator, });
const logoutUser = makeLogoutUser();
const userProfile = makeGetUserProfile();

const userController = Object.freeze({
  registerUser,
  loginUser,
  logoutUser,
  userProfile,
});

export default userController;
export { registerUser, loginUser, logoutUser, userProfile };
