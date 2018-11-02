
CREATE TABLE IF NOT EXISTS products
(
    product_id serial NOT NULL PRIMARY KEY,
    product_desc VARCHAR(200) NOT NULL,
    unit_price double precision NOT NULL,
    quantity_supplied INT NOT NULL,
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
    sales_Id serial NOT NULL references attendants(attendant_id),
    sales json[],
    attendant_id INT
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
