import pg from 'pg';
import env from 'dotenv';

env.config();
const db = {};
const config = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  host: process.env.PGHOST,
};
const config2 = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  // password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
};

const pool = new pg.Pool(config);


const queries = {};
queries.selectLoginQuery = 'SELECT * FROM attendants WHERE attendant_email=$1 and attendant_password=$2';
queries.InsertSignup = 'INSERT INTO attendants (attendant_name, attendant_email, attendant_password, attendant_admin) VALUES ($1, $2, $3, $4)';
queries.selectEmail = 'SELECT attendant_email FROM attendants WHERE attendant_email= $1';
queries.selectProductIfExist = 'SELECT * from products WHERE product_desc=$1';
queries.updateProductDuringCreation = 'UPDATE products SET quantity_in_stock = $1, unit_price = $3 WHERE product_desc= $2';
queries.insertProduct = 'INSERT INTO products (product_desc, unit_price, quantity_in_stock, supplier_name, category) VALUES ($1,$2,$3,$4,$5)';
queries.selectProductsWithPagination = 'SELECT * FROM products LIMIT $1 OFFSET $2';
queries.countAllProducts = 'SELECT * FROM products';
queries.selectProductsWithoutPagination = 'SELECT * FROM products';
queries.checkIfAProductExist = 'SELECT * FROM products WHERE product_id = $1 and product_desc = $2';
queries.updateProduct = 'UPDATE products SET product_id = $1, product_desc = $2, unit_price = $3, quantity_in_stock = $4, supplier_name = $5, category = $6 WHERE product_id = $1';
queries.deleteProduct = 'DELETE FROM products WHERE product_id = $1';
queries.selectProductById = 'SELECT * from products WHERE product_id = $1';
queries.getAllsalesRecordCount = 'SELECT * FROM salesrecords';
queries.selectAllSalesRecord = 'SELECT * FROM salesrecords LIMIT $1 OFFSET $2';
queries.selectSalesRecordById = 'SELECT * from salesrecords WHERE salesrecord_id = $1';
queries.selectAllSalesRecordFilterByCreatorWithPagination = 'SELECT * FROM salesRecords WHERE attendant_name = $3 LIMIT $1 OFFSET $2';
queries.selectAllSalesRecordFilterByCreatorWithoutPagination = 'SELECT * FROM salesrecords WHERE attendant_name = $1';



export { pool, queries };
