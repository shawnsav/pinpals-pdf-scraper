export const unwantedUrls = [
  'https://www.colorado-pinball.com/what-are-pinpals/',
  '#Number',
  '#A',
  '#B',
  '#C',
  '#D',
  '#E',
  '#F',
  '#G',
  '#H',
  '#I',
  '#J',
  '#K',
  '#L',
  '#M',
  '#N',
  '#O',
  '#P',
  '#Q',
  '#R',
  '#S',
  '#T',
  '#U',
  '#V',
  '#W',
  '#X',
  '#Y',
  '#Z',
  '#Top',
];

const login = 'login';
const pinpals = 'pinpals';

export const baseUrl = 'https://www.colorado-pinball.com/';

export const loginUrl = `${baseUrl}${login}`;
export const pinpalsUrl = `${baseUrl}${pinpals}`;

export const environmentCredentials = {
  'username-1802': process.env.USERNAME || null,
  'user_password-1802': process.env.PASSWORD || null,
  'form_id': 1802,
};

export const loginQuestions = [
  {
    name: 'username-1802',
    message: 'Pinpals Username:',
    type: 'input',
  }, {
    name: 'user_password-1802',
    message: 'Pinpals Password:',
    type: 'password',
  }
];

export const downloadQuestions = [{
  name: 'path',
  message: 'Path for downloads (default is ./pinpals-pdfs/):',
  type: 'input',
}];