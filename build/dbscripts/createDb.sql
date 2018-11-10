
CREATE DATABASE store_manager;
\connect store_manager

DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS attendants CASCADE;
DROP TABLE IF EXISTS salesRecords CASCADE;
CREATE TABLE IF NOT EXISTS products
(
    product_id serial NOT NULL PRIMARY KEY,
    product_desc VARCHAR(200) NOT NULL,
    unit_price double precision NOT NULL,
    quantity_in_stock INT NOT NULL,
    supplier_name VARCHAR(200)  NOT NULL,
    category VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS attendants
(
    attendant_id serial PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(500) NOT NULL,
    password VARCHAR(500)  NOT NULL,
    admin boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS salesRecords
(
    salesrecord_Id serial NOT NULL,
    product_id serial NOT NULL,
    product_desc VARCHAR(200) NOT NULL,
    unit_price double precision NOT NULL,
    quantity_bought INT,
    amount double precision NOT NULL,
    attendant_id INT,
    attendant_name VARCHAR(200) NOT NULL
);


INSERT INTO products (product_desc, unit_price,  quantity_in_stock, supplier_name, category) VALUES ('Mama Lemon liquid soap 300ml',  450,  30, 'Okonkwo', 'soap');
INSERT INTO products (product_desc, unit_price,  quantity_in_stock, supplier_name, category) VALUES ('Golden Morn 500g',  750, 30,'Okonkwo', 'cereal');
INSERT INTO products (product_desc, unit_price,  quantity_in_stock, supplier_name, category) VALUES ('Morning Fresh liguid soap', 450, 30, 'Okonkwo', 'soap');
INSERT INTO products (product_desc, unit_price,  quantity_in_stock, supplier_name, category) VALUES ('Mama Lemeon liquid soap 300ml',  450, 30, 'Okonkwo', 'soap');
INSERT INTO products (product_desc, unit_price, quantity_in_stock, supplier_name, category) VALUES ('bucket',  450,  30, 'Okonkwo', 'soap');
INSERT INTO products (product_desc, unit_price, quantity_in_stock, supplier_name, category) VALUES ('Biscuits',  450,  30, 'Okonkwo', 'soap');
INSERT INTO products (product_desc, unit_price, quantity_in_stock, supplier_name, category) VALUES ('Omo',  450, 30, 'Okonkwo', 'soap');
INSERT INTO products (product_desc, unit_price, quantity_in_stock, supplier_name, category) VALUES ('Ariel',  450, 30, 'Okonkwo', 'soap');
INSERT INTO products (product_desc, unit_price, quantity_in_stock, supplier_name, category) VALUES ('battery',  450, 30, 'Okonkwo', 'soap');
INSERT INTO products (product_desc, unit_price, quantity_in_stock, supplier_name, category) VALUES ('spoons',  450, 30, 'Okonkwo', 'soap');
INSERT INTO products (product_desc, unit_price, quantity_in_stock, supplier_name, category) VALUES ('Cups',  450, 30, 'Okonkwo', 'soap');


INSERT INTO attendants (name, email, password, admin) VALUES ('otaigbe',  'otaigbe@gmail.com', 'password', true);
INSERT INTO attendants (name, email, password, admin) VALUES ('angela',  'angela@gmail.com', 'password', false);

INSERT INTO salesRecords (product_id, product_desc, unit_price, quantity_bought, amount, attendant_id, attendant_name) VALUES ('6', 'Biscuits', '400', '5', '2000', '2', 'otaigbe'), ('6', 'Biscuits', '400', '5', '2000', '2', 'otaigbe')


