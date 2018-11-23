"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var queries = {};
queries.selectLoginQuery = 'SELECT * FROM attendants WHERE attendant_email=$1 and attendant_password=$2';
queries.InsertSignup = 'INSERT INTO attendants (attendant_name, attendant_lastname, attendant_phoneNumber, attendant_email, attendant_password, attendant_admin) VALUES ($1, $2, $3, $4, $5, $6)';
queries.selectEmail = 'SELECT attendant_email FROM attendants WHERE attendant_email= $1';
queries.selectProductIfExist = 'SELECT * from products WHERE product_desc=$1';
queries.updateProductDuringCreation = 'UPDATE products SET quantity_in_stock = $1, unit_price = $3 WHERE product_desc= $2';
queries.insertProduct = 'INSERT INTO products (product_desc, unit_price, quantity_in_stock, quantity_supplied, supplier_name, category) VALUES ($1,$2,$3,$4,$5,$6)';
queries.selectProductsWithPagination = 'SELECT product_id,product_desc,unit_price,quantity_in_stock FROM products LIMIT $1 OFFSET $2';
queries.countAllProducts = 'SELECT * FROM products';
queries.selectProductsWithoutPagination = 'SELECT product_id,product_desc,unit_price,quantity_in_stock FROM products';
queries.checkIfAProductExist = 'SELECT product_id,product_desc,unit_price,quantity_in_stock,quantity_supplied,supplier_name,category FROM products WHERE product_id = $1 and product_desc = $2';
queries.updateProduct = 'UPDATE products SET product_id = $1, product_desc = $2, unit_price = $3, quantity_in_stock = $4, quantity_supplied = $5, supplier_name = $6, category = $7 WHERE product_id = $1';
queries.deleteProduct = 'DELETE FROM products WHERE product_id = $1';
queries.selectProductById = 'SELECT product_id,product_desc,unit_price,quantity_in_stock,supplier_name,category from products WHERE product_id = $1';
queries.getAllsalesRecordCount = 'SELECT * FROM salesrecords';
queries.selectAllSalesRecordWithPagination = 'SELECT * FROM salesrecords LIMIT $1 OFFSET $2';
queries.selectSalesRecordById = 'SELECT * from salesrecords WHERE salesrecord_id = $1';
queries.selectAllSalesRecordFilterByCreatorWithPagination = 'SELECT * FROM salesRecords WHERE attendant_name= $1 LIMIT $2 OFFSET $3';
queries.selectAllSalesRecordFilterByCreator = 'SELECT * FROM salesRecords WHERE attendant_name = $1';
queries.reduceProductQuantity = 'UPDATE products SET quantity_in_stock=quantity_in_stock - $1 WHERE product_id=$2 from VALUES %L';
queries.getProductsWithPagination = 'SELECT * FROM products LIMIT $1 OFFSET $2';
queries.getProductsWithoutPagination = 'SELECT * FROM products';
var _default = queries;
exports.default = _default;