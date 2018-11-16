"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = _interopRequireDefault(require("pg"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var db = {};
var config = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  host: process.env.PGHOST
};
var config2 = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  // password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT
}; // if (process.env.NODE_ENV === 'test') {
//  } else if (process.env.NODE_ENV === 'development') {
// } else if (process.env.NODE_ENV === 'production') {
// }

var pool = new _pg.default.Pool(config); // db.queryDb = (poolObj, res, query) => {
//   let queryResult = '';
//   poolObj.connect(async (err, client) => {
//     try {
//       queryResult = await client.query(query);
//     } catch (error) {
//       res.status(501).json({
//         message: 'Internal Server error! Couldn"t create an Attendant',
//         ErrorMessage: error.message,
//       });
//     }
//   });
//   return queryResult;
// };

var _default = pool;
exports.default = _default;