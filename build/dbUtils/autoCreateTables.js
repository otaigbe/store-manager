"use strict";

var _pgFormat = _interopRequireDefault(require("pg-format"));

var _dbConnection = _interopRequireDefault(require("./dbConnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createProductsTable = "CREATE TABLE IF NOT EXISTS products\n(\n    product_id serial NOT NULL PRIMARY KEY,\n    product_desc VARCHAR(200) NOT NULL,\n    unit_price double precision NOT NULL,\n    quantity_in_stock INT NOT NULL,\n    supplier_name VARCHAR(200)  NOT NULL,\n    category VARCHAR(200) NOT NULL\n)";
var createAttendantsTable = "CREATE TABLE IF NOT EXISTS attendants\n(\n    attendant_id serial PRIMARY KEY NOT NULL,\n    attendant_name VARCHAR(200) NOT NULL,\n    attendant_email VARCHAR(500) NOT NULL,\n    attendant_password VARCHAR(500)  NOT NULL,\n    attendant_admin boolean NOT NULL\n)";
var createSalesRecordTable = "CREATE TABLE IF NOT EXISTS salesRecords\n(\n    salesrecord_Id serial NOT NULL,\n    product_id serial NOT NULL,\n    product_desc VARCHAR(200) NOT NULL,\n    unit_price double precision NOT NULL,\n    quantity_bought INT,\n    amount double precision NOT NULL,\n    attendant_id INT,\n    attendant_name VARCHAR(200) NOT NULL\n)";
var array = [];
array.push(['Mama Lemon liquid soap 300ml', 450, 30, 'Okonkwo', 'soap'], ['Golden Morn 500g', 750, 30, 'Okonkwo', 'cereal'], ['Morning Fresh liguid soap', 450, 30, 'Okonkwo', 'soap'], ['bucket', 450, 30, 'Okonkwo', 'soap'], ['Biscuits', 450, 30, 'Okonkwo', 'soap'], ['Omo', 450, 30, 'Okonkwo', 'soap'], ['Ariel', 450, 30, 'Okonkwo', 'soap'], ['battery', 450, 30, 'Okonkwo', 'soap'], ['spoons', 450, 30, 'Okonkwo', 'soap'], ['Cups', 450, 30, 'Okonkwo', 'soap']);
var populateProductTableString = (0, _pgFormat.default)('INSERT INTO products (product_desc, unit_price,  quantity_in_stock, supplier_name, category) VALUES %L', array);
var array2 = [['otaigbe', 'otaigbe@gmail.com', 'password', true], ['angela', 'angela@gmail.com', 'password', false]];
var populateAttendantsTableString = (0, _pgFormat.default)('INSERT INTO attendants (attendant_name, attendant_email, attendant_password, attendant_admin) VALUES %L', array2);
var array3 = [['6', 'Biscuits', '400', '5', '2000', '1', 'otaigbe'], ['6', 'Biscuits', '400', '5', '2000', '2', 'angela']];
var populateSalesRecordsTableString = (0, _pgFormat.default)('INSERT INTO salesRecords (product_id, product_desc, unit_price, quantity_bought, amount, attendant_id, attendant_name) VALUES %L', array3);

_dbConnection.default.connect(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(err, client) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (err) console.log(err);
            _context.prev = 1;
            _context.next = 4;
            return client.query('DROP TABLE IF EXISTS products, salesRecords, attendants');

          case 4:
            _context.next = 6;
            return client.query(createProductsTable);

          case 6:
            _context.next = 8;
            return client.query(createAttendantsTable);

          case 8:
            _context.next = 10;
            return client.query(createSalesRecordTable);

          case 10:
            _context.next = 12;
            return client.query(populateProductTableString);

          case 12:
            _context.next = 14;
            return client.query(populateAttendantsTableString);

          case 14:
            _context.next = 16;
            return client.query(populateSalesRecordsTableString);

          case 16:
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);

          case 21:
            console.log('Tables created and Populated');
            process.exit();

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 18]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());