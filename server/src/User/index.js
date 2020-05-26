import buildMakeUser from './user.entity';
import Id from '../Id';
import crypto from 'crypto';
import sanitizeHtml from 'sanitize-html';
import validation from '../util';

const makeUser = buildMakeUser({ Id, md5, validation, sanitize, });

export default makeUser;

function sanitize (text) {
  return sanitizeHtml(text, {
    allowedIframeHostnames: ['codesandbox.io', 'repl.it'],
  });
};

function md5 (text) {
  return crypto
    .createHash('md5')
    .update(text, 'utf-8')
    .digest('hex');
};
