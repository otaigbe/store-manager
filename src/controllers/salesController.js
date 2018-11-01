import pool from './db';

const controllerObj = {};
controllerObj.getSalesRecordById = (req, res) => {
  const param = Number(req.params.id);
  const temp = [];
  temp.push(param);
  const sql = 'SELECT * FROM salesrecords WHERE sales_id = $1';
  pool.connect(async (err, client) => {
    const dbrows = await client.query(sql, temp);
    console.log(dbrows.rows[0]);
    res.status(200).json({
      message: 'Resource Found',
      resorce: dbrows.rows[0],
    });
  });
};


controllerObj.createSalesRecord = (req, res) => {
  const array = req.body;
  console.log(array);
  const attendantId = array[0].attendant_id;
  const params = [];
  params.push(array, attendantId);
  const sql = 'INSERT INTO salesrecords (sales, attendant_id) VALUES ($1,$2)';
  pool.connect(async (err, client) => {
    const dbrows = await client.query(sql, params);
    console.log(dbrows);
    res.status(201).json({
      message: 'Resource Created!',
    });
  });
};

controllerObj.getAllSalesRecord = (req, res) => {
  const sql = 'SELECT * FROM salesrecords';
  pool.connect(async (err, client) => {
    const dbrows = await client.query(sql);
    res.status(200).json({
      message: 'Resources Found',
      resources: dbrows.rows[0],
    });
  });
};

export default controllerObj;
