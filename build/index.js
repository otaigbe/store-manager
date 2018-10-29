'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _products = require('./routes/products');

var _products2 = _interopRequireDefault(_products);

var _sales = require('./routes/sales');

var _sales2 = _interopRequireDefault(_sales);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.urlencoded({ extended: true }));
app.use(_express2.default.static('./UI'));
app.use(_express2.default.json());

app.use('/api/v1/products', _products2.default);
app.use('/api/v1/sales', _sales2.default);
var port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log('app running on ' + port + '...');
});

/* const stop = function stop() {
  server.close();
}; */
exports.default = app;
// export { app, stop };