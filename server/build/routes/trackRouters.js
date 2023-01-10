"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _trackController = require("../controllers/trackController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var trackRouter = _express["default"].Router();
trackRouter.post('/genres', _trackController.genres);
trackRouter.get('/search', _trackController.search);
trackRouter.post('/add', _trackController.addTrack);
trackRouter.get('/read', _trackController.getTrack);
trackRouter["delete"]('/delete', _trackController.deleteTrack);
trackRouter.post('/player/add', _trackController.addTrackPlayerQueue);
trackRouter.put('/recommend', _trackController.retrieveTrack);
var _default = trackRouter;
exports["default"] = _default;