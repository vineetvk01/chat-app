import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import authentication from './middleware/auth';
import { registerUser, loginUser, logoutUser, userProfile } from './controllers/user';
import { getAllChatUsers, sendChatToUser, getChatUserInfo } from './controllers/chat';
import makeCallback from './express-callback';

const app = express();

var corsOptions = {
  origin: ['http://localhost:3000', process.env.CLIENT],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.json());
app.use(authentication);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
  );
  res.header('Access-Control-Allow-Headers', 'Content-Type, *');
  next();
});

app.use(cors(corsOptions));

app.use(express.static(path.  join(__dirname, '../public')));

/* API Entry points */

// User Authentication
app.post('/api/user/register', makeCallback(registerUser));
app.post('/api/user/login', makeCallback(loginUser));
app.post('/api/user/logout', makeCallback(logoutUser));
app.get('/api/users/me', makeCallback(userProfile));
app.put('/api/users/me/update', makeCallback(registerUser));
app.delete('/api/users/me/delete', makeCallback(registerUser));

// Chats
app.get('/api/chat/users', makeCallback(getAllChatUsers));
app.post('/api/chat/user/:userid', makeCallback(sendChatToUser));
app.get('/api/chat/user/:userid', makeCallback(getChatUserInfo));

app.get('/', (req, res) => {
  res.status(200).send({
    server: 'Running',
  });
});

app.use(function (req, res, next) {
  res.status(404);
  // respond with json
  console.log('Not Found -->', req.path, req.method)
  if (req.accepts('json')) {
    res.send({ status: '404', error: 'Not found', });
    return;
  }
  res.send();
});

export default app;
