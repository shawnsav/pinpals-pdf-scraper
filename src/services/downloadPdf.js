import fs from 'fs';
import rp from 'request-promise';

const defaultPath = './pinpals-pdfs/';
const slash = '/';
const one = 1;

const downloadPdf = (uri, filePath = '') => rp({
    uri,
    method: 'GET',
    encoding: null,
    headers: { "Content-type": "applcation/pdf" },
    resolveWithFullResponse: true,
  }).then(response => {
    const start = uri.lastIndexOf(slash) + one;
    const fileName = uri.slice(start);

    let path = filePath.length ? filePath : defaultPath;
    if (path[path.length - one] !== slash) {
      path = path.concat(slash);
    }

    const writeStream = fs.createWriteStream(`${path}${fileName}`);
    writeStream.write(response.body, 'binary');
    writeStream.end();
    console.log(`\nDownloaded: ${fileName}`);
    return fileName;
  })
  .catch(error => {
    console.log(`Error downloading .pdf (${uri}):`, error);
  });

export default downloadPdf;
