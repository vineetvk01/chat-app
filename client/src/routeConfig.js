import Login from './views/Login';
import Signup from './views/Signup';
import Profile from './views/Profile';
import Chats from './views/Chats';
import NotFound from './views/NotFound';
import DM from './views/DM';

export const routeConfig = {
  loginPage: {
    component: Login,
    route: '/login',
    exact: true
  },
  signupPage: {
    component: Signup,
    route: '/signup',
    exact: true
  },
  profilePage: {
    component: Profile,
    route: '/profile/:username',
    exact: true
  },
  DMPage :{
    component: DM,
    route: '/chat/:userid',
    exact: true
  },
  userHomePage: {
    component: Chats,
    route: '/',
    exact: true
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};