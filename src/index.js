#!/usr/bin/env/ node

import '@babel/polyfill';
import inquirer from 'inquirer';
import cliProgress from 'cli-progress';

import login from './services/login';
import getMachinePageUrls from './services/getMachinePageUrls';
import getPdfFileUrl from './services/getPdfFileUrl';
import downloadPdf from './services/downloadPdf';

import sequencePromises from './utils/sequencePromises';

import {
  environmentCredentials,
  loginQuestions,
  downloadQuestions,
} from './constants';

const main = async () => {
  let credentials = { ...environmentCredentials };
  if (Object.values(credentials).some(value => !value)) {
    const input = await inquirer.prompt(loginQuestions).then(answers => answers);
    credentials = { ...credentials, ...input };
  }

  console.log('\nLogging in!');
  const cookieJar = await login(credentials);
  console.log('------------ Successfully logged in!');

  console.log('\nFetching individual machine page urls...');
  const machineUrls = await getMachinePageUrls();
  console.log(`\nSuccessfully retrieved ${machineUrls.length} machine page urls`)

  const progressBar = new cliProgress.Bar({}, cliProgress.Presets.shades_classic);
  // individual pinpals pages need cookie
  const machineUrlPromises = machineUrls.map(url => () => {
    progressBar.increment();
    return getPdfFileUrl(url, cookieJar);
  });

  console.log('\nFetching individual .pdf urls.');
  console.log('This may take a few minutes.')
  progressBar.start(machineUrlPromises.length, 0);
  const fileUrls = await sequencePromises(machineUrlPromises);
  console.log('\nSuccessfully retrieved machine page urls:');
  console.log(fileUrls);

  const downloadPath = await inquirer.prompt(downloadQuestions).then(answers => answers.path);
  console.log('\nStarting downloads...');
  const fileDownloadPromises = fileUrls.map(url => () => downloadPdf(url, downloadPath));
  const successfulFiles = await sequencePromises(fileDownloadPromises);
  console.log(`\nSuccessfully downloaded ${successfulFiles.length} .pdfs!`, successfulFiles);

  console.log('\nDone!');
  process.exit(0);
};

console.log('\nStarting!');
main();
