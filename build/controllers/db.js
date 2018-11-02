'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  // user: process.env.PGUSER,
  // database: process.env.PGDATABASE,
  // password: process.env.PGPASSWORD,
  // port: process.env.PGPORT,
  Host: 'ec2-107-22-189-136.compute-1.amazonaws.com',
  // eslint-disable-next-line indent
  Database: 'dcg576259t40m0',
  User: 'eiswqjxnuvwwvx',
  Port: 5432,
  Password: '02fa9f8ade88e87c5f99e148f36f42c92380c7f68dfc856e935351150f0f9723'
};

var pool = new _pg2.default.Pool(config);
exports.default = pool;