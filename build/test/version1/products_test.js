"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chaiJson = _interopRequireDefault(require("chai-json"));

var _chaiUrl = _interopRequireDefault(require("chai-url"));

var _co = _interopRequireDefault(require("co"));

var _index = _interopRequireDefault(require("../../index"));

require("babel-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var expect = _chai.default.expect;

_chai.default.use(_chaiHttp.default);

_chai.default.use(_chaiJson.default);

describe('Testing out Products endpoints', function () {
  describe('Testing products GET', function () {
    it('GET / products endpoint; should return all products with pagination',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _chai.default.request(_index.default).get('/api/v1/products/').query({
                pageNumber: 1
              });

            case 2:
              res = _context.sent;
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              expect(res.body).to.have.property('message');
              expect(res.body).to.have.property('Products');

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
    it('GET / products endpoint; should return all products without pagination',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var res;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _chai.default.request(_index.default).get('/api/v1/products/');

            case 2:
              res = _context2.sent;
              expect(res).to.have.status(200);
              expect(res).to.be.json;

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
    it('GET / products endpoint; should return single product',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var res;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _chai.default.request(_index.default).get('/api/v1/products/5');

            case 2:
              res = _context3.sent;
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              expect(res.body).to.have.property('message');
              expect(res.body.message).to.equal('Product Found!');
              expect(res.body).to.have.property('Product');

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })));
    it('GET / products endpoint; should return product not found',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var res;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _chai.default.request(_index.default).get('/api/v1/products/50000');

            case 2:
              res = _context4.sent;
              expect(res).to.have.status(404);
              expect(res).to.be.json;
              expect(res.body).to.have.property('message');
              expect(res.body.message).to.equal('Product doesn\'t exist!');

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })));
  }); // end of products GET

  describe('Testing the Posts Method', function () {
    it('POST / products endpoint should return a 401 error. No access token provided!',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var res;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/products').type('form').send({
                product_desc: 'short bread butter biscuit',
                unit_price: 650,
                quantity_supplied: 40,
                supplier_name: 'Okonkwo',
                category: 'biscuits'
              });

            case 2:
              res = _context5.sent;
              expect(res).to.have.status(401);
              expect(res.body).to.eql({
                message: 'No access token provided! Unaccessible resource'
              });

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    })));
    it('POST / products endpoint; should create a new Product in the database',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var res;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/products').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI').type('form').send({
                product_desc: 'short bread butter biscuit',
                unit_price: 650,
                quantity_supplied: 40,
                supplier_name: 'Okonkwo',
                category: 'biscuits'
              });

            case 2:
              res = _context6.sent;
              expect(res.body).to.be.a.jsonObj();
              expect(res.body).to.have.property('message');
              expect(res).to.have.status(201);
              expect(res.body.message).to.equal('Created a new product.');

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    })));
    it('POST / products endpoint; should update an already existing product in the database',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var res;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/products').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI').type('form').send({
                product_desc: 'bucket',
                unit_price: 150,
                quantity_supplied: 10,
                supplier_name: 'Okonkwo',
                category: 'hardware'
              });

            case 2:
              res = _context7.sent;
              expect(res.body).to.be.a.jsonObj();
              expect(res).to.have.status(200);
              expect(res.body).to.eql({
                message: 'Updated an already existent product.'
              });

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    })));
    it('POST / products endpoint; should report a validation error',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var res;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/products').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI').type('form').send({
                product_desc: 'bucket',
                unit_price: 350,
                quantity_in_stock: 10,
                supplier_name: 'Okonkwo',
                category: 'biscuits'
              });

            case 2:
              res = _context8.sent;
              expect(res.body).to.be.a.jsonObj();
              expect(res).to.have.status(422);
              expect(res.body).to.have.property('message');
              expect(res.body).to.have.property('Error');
              expect(res.body.message).to.equal('Something wrong with input!');

            case 8:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    })));
    it('POST / products endpoint; should return a no access message',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      var res;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return _chai.default.request(_index.default).post('/api/v1/products').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ2VsYUBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU0MTQ4OTE5NH0.aEbvCde9ALV1B0VksKGuu39PIdbWUiGYc5eoigtEAgw').type('form').send({
                product_desc: 'bucket',
                unit_price: 350,
                quantity_in_stock: 10,
                supplier_name: 'Okonkwo',
                category: 'biscuits'
              });

            case 2:
              res = _context9.sent;
              expect(res.body).to.be.a.jsonObj();
              expect(res).to.have.status(403);
              expect(res.body).to.eql({
                message: 'Forbidden! You need to have  admin privileges'
              });

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    })));
  }); // end of POST
  // Beginning of PUT

  describe('Testing the PUT method', function () {
    it('PUT / should return no access token error',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10() {
      var res;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return _chai.default.request(_index.default).put('/api/v1/products/id').type('form').send({
                product_id: 6,
                product_desc: 'Biscuits',
                unit_price: 400,
                quantity_supplied: 150,
                supplier_name: 'Okonkwo',
                category: 'soap'
              });

            case 2:
              res = _context10.sent;
              expect(res).to.have.status(401);
              expect(res.body).to.eql({
                message: 'No access token provided! Unaccessible resource'
              });

            case 5:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    })));
    it('PUT / should return a product doesnt exists error message',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11() {
      var res;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return _chai.default.request(_index.default).put('/api/v1/products/6').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI').type('form').send({
                product_id: 6,
                product_desc: 'Detergent',
                unit_price: 400,
                quantity_supplied: 150,
                supplier_name: 'Okonkwo',
                category: 'soap'
              });

            case 2:
              res = _context11.sent;
              expect(res).to.have.status(404);
              expect(res.body).to.eql({
                message: 'Product doesn\'t exist! Create the Product'
              });

            case 5:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    })));
    it('PUT / should return a forbidden access error',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12() {
      var res;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return _chai.default.request(_index.default).put('/api/v1/products/6').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ2VsYUBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU0MTQ4OTE5NH0.aEbvCde9ALV1B0VksKGuu39PIdbWUiGYc5eoigtEAgw').type('form').send({
                product_id: 6,
                product_desc: 'Biscuits',
                unit_price: 400,
                quantity_supplied: 150,
                supplier_name: 'Okonkwo',
                category: 'soap'
              });

            case 2:
              res = _context12.sent;
              expect(res).to.have.status(403);
              expect(res.body).to.eql({
                message: 'Forbidden! You need to have  admin privileges'
              });

            case 5:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    })));
    it('PUT / should return a validation error! Unprocessable entity',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13() {
      var res;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return _chai.default.request(_index.default).put('/api/v1/products/6').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI').type('form').send({
                product_id: 6,
                product_desc: 'Biscuits',
                unit_price: 400,
                quantity_in_stock: 150,
                supplier_name: 'Okonkwo',
                category: 'soap'
              });

            case 2:
              res = _context13.sent;
              expect(res).to.have.status(422);
              expect(res.body).to.have.property('message');
              expect(res.body.message).to.equal('Validation error! Please check your input');

            case 6:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    })));
    it('PUT / should modify a product in the database',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14() {
      var res;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return _chai.default.request(_index.default).put('/api/v1/products/7').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI').type('form').send({
                product_id: 7,
                product_desc: 'Ariel',
                unit_price: 400,
                quantity_supplied: 150,
                supplier_name: 'Okonkwo',
                category: 'Detergent'
              });

            case 2:
              res = _context14.sent;
              expect(res).to.have.status(200);
              expect(res.body).to.eql({
                message: 'Product Modified'
              });

            case 5:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    })));
  }); // end of PUT
  // Beginning of DELETE

  describe('Testing the Delete method', function () {
    it('Delete / should return no access token error',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee15() {
      var res;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return _chai.default.request(_index.default).del('/api/v1/products/6');

            case 2:
              res = _context15.sent;
              expect(res).to.have.status(401);
              expect(res.body).to.eql({
                message: 'No access token provided! Unaccessible resource'
              });

            case 5:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, this);
    })));
    it('Delete / should return cannot delete a non existent product message',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee16() {
      var res;
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return _chai.default.request(_index.default).del('/api/v1/products/500').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI');

            case 2:
              res = _context16.sent;
              expect(res).to.have.status(404);
              expect(res.body).to.have.property('message');
              expect(res.body.message).to.equal('Product doesn\'t exist! Nothing to Delete');

            case 6:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, this);
    })));
    it('Delete / should delete a product from the database',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee17() {
      var res;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return _chai.default.request(_index.default).del('/api/v1/products/8').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI');

            case 2:
              res = _context17.sent;
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('message');
              expect(res.body.message).to.equal('Product Deleted');

            case 6:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, this);
    })));
    it('checks if one is an admin',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee18() {
      var res;
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return _chai.default.request(_index.default).del('/api/v1/products/8').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ2VsYUBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImF0dGVuZGFudF9pZCI6MiwibmFtZSI6ImFuZ2VsYSIsImlhdCI6MTU0MjI4Njg4MH0.8pQOl4ZxzdecrpTvUMGCc5x6boPzToWjgy5910cykEs');

            case 2:
              res = _context18.sent;
              expect(res).to.have.status(403);

            case 4:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18, this);
    })));
  });
});