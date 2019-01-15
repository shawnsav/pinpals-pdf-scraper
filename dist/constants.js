"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadQuestions = exports.loginQuestions = exports.environmentCredentials = exports.pinpalsUrl = exports.loginUrl = exports.baseUrl = exports.unwantedUrls = void 0;
var unwantedUrls = ['https://www.colorado-pinball.com/what-are-pinpals/', '#Number', '#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#I', '#J', '#K', '#L', '#M', '#N', '#O', '#P', '#Q', '#R', '#S', '#T', '#U', '#V', '#W', '#X', '#Y', '#Z', '#Top'];
exports.unwantedUrls = unwantedUrls;
var login = 'login';
var pinpals = 'pinpals';
var baseUrl = 'https://www.colorado-pinball.com/';
exports.baseUrl = baseUrl;
var loginUrl = "".concat(baseUrl).concat(login);
exports.loginUrl = loginUrl;
var pinpalsUrl = "".concat(baseUrl).concat(pinpals);
exports.pinpalsUrl = pinpalsUrl;
var environmentCredentials = {
  'username-1802': process.env.USERNAME || null,
  'user_password-1802': process.env.PASSWORD || null,
  'form_id': 1802
};
exports.environmentCredentials = environmentCredentials;
var loginQuestions = [{
  name: 'username-1802',
  message: 'Pinpals Username:',
  type: 'input'
}, {
  name: 'user_password-1802',
  message: 'Pinpals Password:',
  type: 'password'
}];
exports.loginQuestions = loginQuestions;
var downloadQuestions = [{
  name: 'path',
  message: 'Path for downloads (default is ./pinpals-pdfs/):',
  type: 'input'
}];
exports.downloadQuestions = downloadQuestions;