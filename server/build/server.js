"use strict";

require("dotenv/config");
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _userRouters = _interopRequireDefault(require("./routes/userRouters"));
var _trackRouters = _interopRequireDefault(require("./routes/trackRouters"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
var PORT = 3001;
app.use((0, _cors["default"])());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use((0, _cookieParser["default"])());
app.use('/users', _userRouters["default"]);
app.use('/tracks', _trackRouters["default"]);
app.listen(PORT, function () {
  return console.log("Server connected in port ".concat(PORT));
});