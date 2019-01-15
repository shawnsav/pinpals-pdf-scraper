"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _requestPromise = _interopRequireDefault(require("request-promise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultPath = './pinpals-pdfs/';
var slash = '/';
var one = 1;

var downloadPdf = function downloadPdf(uri) {
  var filePath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return (0, _requestPromise.default)({
    uri: uri,
    method: 'GET',
    encoding: null,
    headers: {
      "Content-type": "applcation/pdf"
    },
    resolveWithFullResponse: true
  }).then(function (response) {
    var start = uri.lastIndexOf(slash) + one;
    var fileName = uri.slice(start);
    var path = filePath.length ? filePath : defaultPath;

    if (path[path.length - one] !== slash) {
      path = path.concat(slash);
    }

    var writeStream = _fs.default.createWriteStream("".concat(path).concat(fileName));

    writeStream.write(response.body, 'binary');
    writeStream.end();
    console.log("\nDownloaded: ".concat(fileName));
    return fileName;
  }).catch(function (error) {
    console.log("Error downloading .pdf (".concat(uri, "):"), error);
  });
};

var _default = downloadPdf;
exports.default = _default;