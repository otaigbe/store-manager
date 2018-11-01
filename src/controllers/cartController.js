import pool from './db';

const cart = {};

cart.addToCart = (req, res) => {
  // if (req.body.length === 0) {

  const params = [];
  params.push(req.body.product_id, req.body.product_desc);
  console.log(params);
  const sql = 'SELECT * FROM products where product_id=$1 AND product_desc=$2';
  pool.connect(async (err, client) => {
    const dbrows = await client.query(sql, params);
    console.log(dbrows.rows[0]);
    const quanSupplied = dbrows.rows[0].quantity_supplied;
    const quantityToBeBought = req.body.quantity;
    const remainder = Number(quanSupplied) - Number(quantityToBeBought);
    const params2 = [];
    params2.push(remainder);
    params2.push(req.body.product_id);
    const updateQuery = 'UPDATE products set quantity_supplied= $1 WHERE product_id= $2';
    const affectedRows = await client.query(updateQuery, params2);
    console.log(affectedRows);
    res.status(200).json(affectedRows);
    
  });
};
// };


export default cart;
