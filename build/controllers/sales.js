'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var controllerObj = {};
controllerObj.getSalesRecordById = function (req, res) {
  var param = Number(req.params.id);
  var temp = [];
  temp.push(param);
  var sql = 'SELECT * FROM salesrecords WHERE sales_id = $1';
  _db2.default.connect(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, client) {
      var dbrows;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return client.query(sql, temp);

            case 2:
              dbrows = _context.sent;

              console.log(dbrows.rows[0]);
              res.status(200).json({
                message: 'Resource Found',
                resorce: dbrows.rows[0]
              });

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

controllerObj.createSalesRecord = function (req, res) {
  var attendantId = Math.floor(Math.random() * 2) + 1;
  var array = req.body;
  console.log(array);
  var params = [];
  params.push(array, attendantId);
  var sql = 'INSERT INTO salesrecords (sales, attendant_id) VALUES ($1,$2)';
  _db2.default.connect(function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err, client) {
      var dbrows;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return client.query(sql, params);

            case 2:
              dbrows = _context2.sent;

              console.log(dbrows);
              res.status(201).json({
                message: 'Resource Created!'
              });

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};

controllerObj.getAllSalesRecord = function (req, res) {
  var sql = 'SELECT * FROM salesrecords';
  _db2.default.connect(function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(err, client) {
      var dbrows;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return client.query(sql);

            case 2:
              dbrows = _context3.sent;

              res.status(200).json({
                message: 'Resources Found',
                resources: dbrows.rows
              });

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};

exports.default = controllerObj;