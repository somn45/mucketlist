"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/userController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userRouter = _express["default"].Router();
userRouter.post('/join', _userController.join);
userRouter.post('/login', _userController.login);
userRouter.post('/spotify/auth', _userController.spotifyAuth);
userRouter.post('/spotify/refresh', _userController.refresh);
var _default = userRouter;
exports["default"] = _default;