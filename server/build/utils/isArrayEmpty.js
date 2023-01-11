"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var isArrayEmpty = function isArrayEmpty(array) {
  if (Array.isArray(array) && array.length === 0) return true;
  return false;
};
var _default = isArrayEmpty;
exports["default"] = _default;