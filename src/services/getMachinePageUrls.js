import rp from 'request-promise'
import $ from 'cheerio';
import { pinpalsUrl, unwantedUrls } from '../constants';

const wrapperClassName = '.elementor-widget-wrap';
const anchorTag = 'a';
const href = 'href';

const getMachinePageUrls = async () => await rp(pinpalsUrl)
  .then(html => {
    const anchors = Array.from($(wrapperClassName, html).find(anchorTag));
    const urls = anchors.map(element => $(element).attr(href))
                        .filter(url => !unwantedUrls.includes(url));
    return urls;
  })
  .catch(error => {
    console.log('Errr getting machine page urls:', error);
  });

export default getMachinePageUrls;