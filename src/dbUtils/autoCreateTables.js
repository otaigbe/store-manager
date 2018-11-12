import format from 'pg-format';
import { queries, pool } from './queries/queries';

const createProductsTable = `CREATE TABLE IF NOT EXISTS products
(
    product_id serial NOT NULL PRIMARY KEY,
    product_desc VARCHAR(200) NOT NULL,
    unit_price double precision NOT NULL,
    quantity_in_stock INT NOT NULL,
    supplier_name VARCHAR(200)  NOT NULL,
    category VARCHAR(200) NOT NULL
)`;

const createAttendantsTable = `CREATE TABLE IF NOT EXISTS attendants
(
    attendant_id serial PRIMARY KEY NOT NULL,
    attendant_name VARCHAR(200) NOT NULL,
    attendant_email VARCHAR(500) NOT NULL,
    attendant_password VARCHAR(500)  NOT NULL,
    attendant_admin boolean NOT NULL
)`;

const createSalesRecordTable = `CREATE TABLE IF NOT EXISTS salesRecords
(
    salesrecord_Id serial NOT NULL,
    product_id serial NOT NULL,
    product_desc VARCHAR(200) NOT NULL,
    unit_price double precision NOT NULL,
    quantity_bought INT,
    amount double precision NOT NULL,
    attendant_id INT,
    attendant_name VARCHAR(200) NOT NULL
)`;

const array = [];
array.push(['Mama Lemon liquid soap 300ml', 450, 30, 'Okonkwo', 'soap'],
  ['Golden Morn 500g', 750, 30, 'Okonkwo', 'cereal'],
  ['Morning Fresh liguid soap', 450, 30, 'Okonkwo', 'soap'],
  ['bucket', 450, 30, 'Okonkwo', 'soap'],
  ['Biscuits', 450, 30, 'Okonkwo', 'soap'],
  ['Omo', 450, 30, 'Okonkwo', 'soap'],
  ['Ariel', 450, 30, 'Okonkwo', 'soap'],
  ['battery', 450, 30, 'Okonkwo', 'soap'],
  ['spoons', 450, 30, 'Okonkwo', 'soap'],
  ['Cups', 450, 30, 'Okonkwo', 'soap']);

const populateProductTableString = format('INSERT INTO products (product_desc, unit_price,  quantity_in_stock, supplier_name, category) VALUES %L', array);

const array2 = [['otaigbe', 'otaigbe@gmail.com', 'password', true], ['angela', 'angela@gmail.com', 'password', false]];
const populateAttendantsTableString = format('INSERT INTO attendants (attendant_name, attendant_email, attendant_password, attendant_admin) VALUES %L', array2);

const array3 = [['6', 'Biscuits', '400', '5', '2000', '2', 'otaigbe'], ['6', 'Biscuits', '400', '5', '2000', '2', 'otaigbe']];

const populateSalesRecordsTableString = format('INSERT INTO salesRecords (product_id, product_desc, unit_price, quantity_bought, amount, attendant_id, attendant_name) VALUES %L', array3);

pool.connect(async (err, client) => {
  if (err) console.log(err);
  try {
    await client.query('DROP TABLE IF EXISTS products, salesRecords, attendants');
    await client.query(createProductsTable);
    await client.query(createAttendantsTable);
    await client.query(createSalesRecordTable);
    await client.query(populateProductTableString);
    await client.query(populateAttendantsTableString);
    await client.query(populateSalesRecordsTableString);
  } catch (error) {
    console.log(error);
  }
  console.log('Tables created and Populated');
  process.exit();
});

