"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _versions = _interopRequireDefault(require("./controller/api/versions"));

var _functions = _interopRequireDefault(require("./utils/functions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var app = (0, _express.default)(); // app.use(express.cookieParser());

app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.json());
app.use(_express.default.static('./UI'));
app.use('/', _versions.default);

var port = _functions.default.checkAndSwitchEnvironment();

var server = app.listen(port, function () {
  console.log("app running on ".concat(port, "..."));
});
var _default = server;
exports.default = _default;