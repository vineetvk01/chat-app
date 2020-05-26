import camelCaseKeys from 'camelcase-keys';

import Logger from '../logger';
const logger = Logger('[ EXPRESS-CALLBACK ]');

export default function makeExpressCallback (controller) {
  return (req, res) => {
    const httpRequest = {
      body: camelCaseKeys(req.body, { deep: true, }),
      query: camelCaseKeys(req.query),
      params: camelCaseKeys(req.params),
      ip: req.ip,
      method: req.method,
      path: req.path,
      user: req.user,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
      },
    };
    controller(httpRequest)
      .then(httpResponse => {
        logger.info('Response generated')
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        if (httpResponse.cookies) {
          const { cookies, } = httpResponse;
          cookies.forEach((cookie) => {
            if (cookie.revoke) {
              res.clearCookie(cookie.name, { });
              return;
            }
            res.cookie(cookie.name, cookie.value || {}, cookie.config || { httpOnly: true, });
          });
        }
        res.type('json');
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch(e => {
        logger.error(e);
        return res.status(500).send({ error: 'An unknown error occurred.', });
      });
  };
}
