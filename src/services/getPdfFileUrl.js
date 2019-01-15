import rp from 'request-promise';
import $ from 'cheerio';

const pdfLink = '.pdfemb-viewer';

const getPdfFileUrl = (uri, jar) => rp({
    uri,
    jar,
    method: 'GET',
    simple: false,
  })
  .then(body => $(pdfLink, body).attr('href'))
  .catch(error => {
    console.log('Error getting pdf url:', error);
  });

export default getPdfFileUrl;