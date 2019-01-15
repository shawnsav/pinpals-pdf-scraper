#!/usr/bin/env/ node

import '@babel/polyfill';
import inquirer from 'inquirer';

import login from './services/login';
import getMachinePageUrls from './services/getMachinePageUrls';
import getPdfFileUrl from './services/getPdfFileUrl';
import downloadPdf from './services/downloadPdf';

import sequencePromises from './utils/sequencePromises';

import {
  environmentCredentials,
  loginQuestions,
} from './constants';

const main = async () => {
  let credentials = { ...environmentCredentials };
  if (Object.values(credentials).some(value => !value)) {
    const input = await inquirer.prompt(loginQuestions).then(answers => answers);
    credentials = { ...credentials, ...input };
  }

  console.log('Logging in!');
  const cookieJar = await login(credentials);
  console.log('Successfully logged in!');

  console.log('Fetching individual machine page urls...');
  const machineUrls = await getMachinePageUrls();
  console.log('Successfully retrieved machine page urls:')
  console.log(machineUrls);

  // individual pinpals pages need cookie
  const machineUrlPromises = machineUrls.map(url => () => getPdfFileUrl(url, cookieJar));

  console.log('Fetching individual .pdf urls...');
  const fileUrls = await sequencePromises(machineUrlPromises);
  console.log('Successfully retrieved machine page urls:');
  console.log(fileUrls);

  console.log('Starting downloads...');
  const fileDownloadPromises = fileUrls.map(url => () => downloadPdf(url));
  const successfulFiles = await sequencePromises(fileDownloadPromises);
  console.log('Successfully downloaded:', successfulFiles);

  console.log('Done!');
  process.exit(0);
};

console.log('Starting!');
main();
