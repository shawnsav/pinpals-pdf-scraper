#!/usr/bin/env/ node
"use strict";

require("@babel/polyfill");

var _inquirer = _interopRequireDefault(require("inquirer"));

var _cliProgress = _interopRequireDefault(require("cli-progress"));

var _login = _interopRequireDefault(require("./services/login"));

var _getMachinePageUrls = _interopRequireDefault(require("./services/getMachinePageUrls"));

var _getPdfFileUrl = _interopRequireDefault(require("./services/getPdfFileUrl"));

var _downloadPdf = _interopRequireDefault(require("./services/downloadPdf"));

var _sequencePromises = _interopRequireDefault(require("./utils/sequencePromises"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var main =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var credentials, input, cookieJar, machineUrls, progressBar, machineUrlPromises, fileUrls, downloadPath, fileDownloadPromises, successfulFiles;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            credentials = _objectSpread({}, _constants.environmentCredentials);

            if (!Object.values(credentials).some(function (value) {
              return !value;
            })) {
              _context.next = 6;
              break;
            }

            _context.next = 4;
            return _inquirer.default.prompt(_constants.loginQuestions).then(function (answers) {
              return answers;
            });

          case 4:
            input = _context.sent;
            credentials = _objectSpread({}, credentials, input);

          case 6:
            console.log('\nLogging in!');
            _context.next = 9;
            return (0, _login.default)(credentials);

          case 9:
            cookieJar = _context.sent;
            console.log('------------ Successfully logged in!');
            console.log('\nFetching individual machine page urls...');
            _context.next = 14;
            return (0, _getMachinePageUrls.default)();

          case 14:
            machineUrls = _context.sent;
            console.log("\nSuccessfully retrieved ".concat(machineUrls.length, " machine page urls"));
            progressBar = new _cliProgress.default.Bar({}, _cliProgress.default.Presets.shades_classic); // individual pinpals pages need cookie

            machineUrlPromises = machineUrls.map(function (url) {
              return function () {
                progressBar.increment();
                return (0, _getPdfFileUrl.default)(url, cookieJar);
              };
            });
            console.log('\nFetching individual .pdf urls.');
            console.log('This may take a few minutes.');
            progressBar.start(machineUrlPromises.length, 0);
            _context.next = 23;
            return (0, _sequencePromises.default)(machineUrlPromises);

          case 23:
            fileUrls = _context.sent;
            console.log('\nSuccessfully retrieved machine page urls:');
            console.log(fileUrls);
            _context.next = 28;
            return _inquirer.default.prompt(_constants.downloadQuestions).then(function (answers) {
              return answers.path;
            });

          case 28:
            downloadPath = _context.sent;
            console.log('\nStarting downloads...');
            fileDownloadPromises = fileUrls.map(function (url) {
              return function () {
                return (0, _downloadPdf.default)(url, downloadPath);
              };
            });
            _context.next = 33;
            return (0, _sequencePromises.default)(fileDownloadPromises);

          case 33:
            successfulFiles = _context.sent;
            console.log("\nSuccessfully downloaded ".concat(successfulFiles.length, " .pdfs!"), successfulFiles);
            console.log('\nDone!');
            process.exit(0);

          case 37:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function main() {
    return _ref.apply(this, arguments);
  };
}();

console.log('\nStarting!');
main();