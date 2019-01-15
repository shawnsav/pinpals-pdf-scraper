"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _requestPromise = _interopRequireDefault(require("request-promise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var downloadPdf = function downloadPdf(uri) {
  return (0, _requestPromise.default)({
    uri: uri,
    method: 'GET',
    encoding: null,
    headers: {
      "Content-type": "applcation/pdf"
    },
    resolveWithFullResponse: true
  }).then(function (response) {
    var start = uri.lastIndexOf('/') + 1;
    var fileName = uri.slice(start);

    var writeStream = _fs.default.createWriteStream(fileName);

    writeStream.write(response.body, 'binary');
    writeStream.end();
    console.log("Downloaded: ".concat(fileName));
    return fileName;
  }).catch(function (error) {
    console.log("Error downloading .pdf (".concat(uri, "):"), error);
  });
};

var _default = downloadPdf;
exports.default = _default;