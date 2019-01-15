"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _cheerio = _interopRequireDefault(require("cheerio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pdfLink = '.pdfemb-viewer';

var getPdfFileUrl = function getPdfFileUrl(uri, jar) {
  return (0, _requestPromise.default)({
    uri: uri,
    jar: jar,
    method: 'GET',
    simple: false
  }).then(function (body) {
    return (0, _cheerio.default)(pdfLink, body).attr('href');
  }).catch(function (error) {
    console.log('Error getting pdf url:', error);
  });
};

var _default = getPdfFileUrl;
exports.default = _default;