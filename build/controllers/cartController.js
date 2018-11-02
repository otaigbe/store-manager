'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var cart = {};

cart.addToCart = function (req, res) {
  // if (req.body.length === 0) {

  var params = [];
  params.push(req.body.product_id, req.body.product_desc);
  console.log(params);
  var sql = 'SELECT * FROM products where product_id=$1 AND product_desc=$2';
  _db2.default.connect(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, client) {
      var dbrows, quanSupplied, quantityToBeBought, remainder, params2, updateQuery, affectedRows;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return client.query(sql, params);

            case 2:
              dbrows = _context.sent;

              console.log(dbrows.rows[0]);
              quanSupplied = dbrows.rows[0].quantity_supplied;
              quantityToBeBought = req.body.quantity;
              remainder = Number(quanSupplied) - Number(quantityToBeBought);
              params2 = [];

              params2.push(remainder);
              params2.push(req.body.product_id);
              updateQuery = 'UPDATE products set quantity_supplied= $1 WHERE product_id= $2';
              _context.next = 13;
              return client.query(updateQuery, params2);

            case 13:
              affectedRows = _context.sent;

              console.log(affectedRows);
              res.status(200).json(affectedRows);

            case 16:
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
// };


exports.default = cart;