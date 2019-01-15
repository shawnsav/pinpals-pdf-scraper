"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var wrapperClassName = '.elementor-widget-wrap';
var anchorTag = 'a';
var href = 'href';

var getMachinePageUrls =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _requestPromise.default)(_constants.pinpalsUrl).then(function (html) {
              var anchors = Array.from((0, _cheerio.default)(wrapperClassName, html).find(anchorTag));
              var urls = anchors.map(function (element) {
                return (0, _cheerio.default)(element).attr(href);
              }).filter(function (url) {
                return !_constants.unwantedUrls.includes(url);
              });
              return urls;
            }).catch(function (error) {
              console.log('Errr getting machine page urls:', error);
            });

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getMachinePageUrls() {
    return _ref.apply(this, arguments);
  };
}();

var _default = getMachinePageUrls;
exports.default = _default;