"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _electron = require("electron");

var path = _interopRequireWildcard(require("path"));

var _fs = require("fs");

var _url = require("url");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = function _default(scheme) {
  _electron.protocol.registerBufferProtocol(scheme, function (request, respond) {
    var pathName = new _url.URL(request.url).pathname;
    pathName = decodeURI(pathName);
    (0, _fs.readFile)(path.join(__dirname, pathName), function (error, data) {
      if (error) {
        console.error("Failed to register ".concat(scheme, " protocol"), error);
      }

      var extension = path.extname(pathName).toLowerCase();
      var mimeType = '';

      if (extension === '.js') {
        mimeType = 'text/javascript';
      } else if (extension === '.html') {
        mimeType = 'text/html';
      } else if (extension === '.css') {
        mimeType = 'text/css';
      } else if (extension === '.svg' || extension === '.svgz') {
        mimeType = 'image/svg+xml';
      } else if (extension === '.json') {
        mimeType = 'application/json';
      }

      respond({
        mimeType: mimeType,
        data: data
      });
    });
  });
};

exports.default = _default;