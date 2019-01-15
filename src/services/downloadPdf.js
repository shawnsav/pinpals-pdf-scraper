import fs from 'fs';
import rp from 'request-promise';

const downloadPdf = uri => rp({
    uri,
    method: 'GET',
    encoding: null,
    headers: { "Content-type": "applcation/pdf" },
    resolveWithFullResponse: true,
  }).then(response => {
    const start = uri.lastIndexOf('/') + 1;
    const fileName = uri.slice(start);

    const writeStream = fs.createWriteStream(fileName);
    writeStream.write(response.body, 'binary');
    writeStream.end();
    console.log(`Downloaded: ${fileName}`);
    return fileName;
  })
  .catch(error => {
    console.log(`Error downloading .pdf (${uri}):`, error);
  });

export default downloadPdf;
