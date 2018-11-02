import Joi from 'joi';
import pool from './db';
import con from './dbconString';

const productControlObj = {};
const schema = Joi.object().keys({
  product_desc: Joi.string().required(),
  unit_price: Joi.number().required(),
  quantity_supplied: Joi.number().required(),
  supplier_name: Joi.string().required(),
  category: Joi.string().required(),
});
const schema2 = Joi.object().keys({
  product_desc: Joi.string().required(),
  unit_price: Joi.number().required(),
  quantity_supplied: Joi.number().required(),
  supplier_name: Joi.string().required(),
  category: Joi.string().required(),
  token: Joi.string().required(),
});

productControlObj.createProduct = (req, res) => {
  console.log(req.body);
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    const pname = req.body.product_desc;
    const unitPrice = req.body.unit_price;
    const quantSup = req.body.quantity_supplied;
    const supplier = req.body.supplier_name;
    const cat = req.body.category;
    const params = [];
    params.push(pname, unitPrice, quantSup, supplier, cat);
    const sql = 'INSERT INTO products (product_desc, unit_price, quantity_in_stock, supplier_name, category) VALUES ( $1, $2, $3, $4, $5);';
    pool.connect(async (err, client) => {
      try {
        const dbrows = await client.query(sql, params);
        res.status(201).json({
          message: 'Resource Created!',
        });
      } catch (error) {
        console.log(error.message);
      }
    });
  } else {
    res.status(404).json({
      message: 'resource could not be created',
      Error: result.error,
    });
  }
};

productControlObj.getAllProducts = (req, res) => {
  pool.connect(async (err, client) => {
    const sql = 'SELECT * FROM products';
    try {
      const dbrows = await client.query(sql);

    } catch (error) {
      console.error(error.message);
    }
    res.status(200).json(dbrows.rows);
  });
};

productControlObj.getProductById = (req, res) => {
  const param = Number(req.params.id);
  const temp = [];
  temp.push(param);
  const sql = 'SELECT * FROM products WHERE product_id = $1';
  pool.connect(async (err, client) => {
    const dbrows = await client.query(sql, temp);
    console.log(dbrows.rows[0]);
    res.status(200).json({
      message: 'Resource Found',
      resorce: dbrows.rows[0],
    });
  });
};
// Replace
productControlObj.modifyProduct = (req, res) => {
  const param = [];
  param.push(req.params.id);
  const sql = 'SELECT * FROM products WHERE product_id = $1';
  pool.connect(async (err, client) => {
    const dbrows = await client.query(sql, param);
    if (dbrows.rows[0].product_id) {
      const params = [req.body.product_desc, req.body.unit_price, req.body.quantity_supplied, req.body.supplier_name, req.body.category, req.body.product_id];
      const sql2 = 'UPDATE products SET product_desc=$1, unit_price=$2, quantity_in_stock=$3, supplier_name=$4, category=$5 WHERE product_id = $6';
      try {
        const dbrows2 = await client.query(sql2, params);
        res.status(200).json({
          message: 'Resource Updated',
          resorce: dbrows2.rows[0],
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  });
};

productControlObj.deleteProduct = (req, res) => {
  const param = [];
  param.push(req.body.product_id);
  const sql = 'SELECT product_id FROM products WHERE product_id = $1';
  pool.connect(async (err, client) => {
    try {     
      const dbrows = await client.query(sql, param);
      console.log(dbrows.rows[0]);
      if (dbrows.rows[0].product_id === req.body.product_id) {
        console.log(dbrows.rows[0]);
        const temp = [];
        temp.push(dbrows.rows[0].product_id);
        const sql2 = 'DELETE FROM products WHERE product_id = $1';
        try {
          const dbrows2 = await client.query(sql2, temp);
          res.status(200).json({
            message: 'Resource Deleted!',
            resorce: dbrows2.rows[0],
          });
        } catch (error) {
          console.log(error.message);
        }
      }
    } catch (error) {
      console.log(error.message);
    }  
    
  });
};

export default productControlObj;
