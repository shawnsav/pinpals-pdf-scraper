import 'dotenv/config';
import rp from 'request-promise';

import { loginUrl, baseUrl } from '../constants';

const loginOptions = {
  uri: loginUrl,
  method: 'POST',
  jar: true,
  'content-type': 'application/x-www-form-urlencoded',
  resolveWithFullResponse: true,
  simple: false,
};

const login = async credentials =>
  await rp({
      ...loginOptions,
      form: {
        ...credentials,
        timestamp: Math.round(Date.now() / 1000),
      },
    })
    .then(async response => {
      const cookieJar = rp.jar();
      const cookies = response.headers['set-cookie'];
      await cookies.forEach(cookie => {
        cookieJar.setCookie(cookie, baseUrl);
      });
      return cookieJar;
    })
    .catch(error => {
      console.log('Login Error: ', error);
      return error;
    });

export default login;