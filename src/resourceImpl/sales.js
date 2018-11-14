/* eslint-disable consistent-return */
import format from 'pg-format';
import jwt from 'jsonwebtoken';
import customFunc from '../utils/functions';
import { pool, queries } from '../dbUtils/queries/queries';

const salesImpl = {};
salesImpl.createSalesRecord = (req, res) => {
  // console.log(req.body);
  const records = [];
  if (customFunc.typeOf(req.body) === 'array') {
    for (let i = 0; i < req.body.length; i += 1) {
      const inner = [];
      inner.push(req.body[i].product_id, req.body[i].product_desc, req.body[i].unit_price, req.body[i].quantity_bought, req.body[i].amount, req.body[i].attendant_id, req.body[i].attendant_name);
      records.push(inner);
    }
    pool.connect(async (err, client) => {
      if (err) return res.status(501).send('Something is wrong! Unable to connect to the database');
      const multiInsert = format('INSERT INTO salesRecords (product_id, product_desc, unit_price, quantity_bought, amount, attendant_id, attendant_name) VALUES %L', records);
      try {
        const insertResult = await client.query(multiInsert);
        return res.status(200).json({ message: 'Records saved' });
      } catch (error) {
        return res.status(501).send('Something is wrong! Unable to save sales records to the database');
      }
    });
  } else {
    pool.connect(async (err, client) => {
      if (err) return res.status(501).send('Something is wrong! Unable to connect to the database');
      const singleInsert = format('INSERT INTO salesRecords(product_id, product_desc, unit_price, quantity_bought, amount, attendant_id, attendant_name) VALUES %L', req.body);
      try {
        const insertResult = await client.query(singleInsert);
      } catch (error) {
        return res.status(501).send('Something is wrong! Unable to save sales records to the database');
      }
      return res.status(200).json({ message: 'Records saved' });
    });
  }
};

salesImpl.getAllSalesRecords = (req, res) => {
  const urlQuery = req.query;
  const token = req.header('x-auth-token');
  const page = req.query.pageNumber;
  const itemsPerPage = 5;
  const pageOffset = (page - 1) * itemsPerPage;
  if (token) {
    const decoded = jwt.verify(token, process.env.JWTKEY);
    // console.log(decoded);
    // if (!customFunc.isEmpty(decoded)) {
    if (!customFunc.isEmpty(urlQuery)) {
      const args = [];
      args.push(itemsPerPage);
      args.push(pageOffset);
      if (decoded.admin === true) {
        pool.connect(async (err, client) => {
          if (err) return res.status(501).json({ message: 'Internal Database Error' });
          try {
            const count = await client.query(queries.getAllsalesRecordCount);
            const selectResultSet = await client.query(queries.selectAllSalesRecord, args);
            res.status(200).json({
              message: `Showing pages ${page} of ${count.rows.length}`,
              salesRecords: selectResultSet.rows,
            });
          } catch (e) {
            res.status(501).json({
              message: 'Query wasn\'t executed',
              Error: e.message,
            });
          }
        });
      } else if (decoded.admin === false) {
        // console.log(decoded.name);
        args.push(decoded.name);
        pool.connect(async (err, client) => {
          if (err) return res.status(501).json({ message: 'Internal Database Error' });
          try {
            const count = await client.query(queries.selectAllSalesRecordFilterByCreatorWithoutPagination);
            const selectResultSet = await client.query(queries.selectAllSalesRecordFilterByCreatorWithPagination, args);
            res.status(200).json({
              message: `Showing pages ${page} of ${count.rows.length}`,
              salesRecords: selectResultSet.rows,
            });
          } catch (e) {
            res.status(501).json({
              message: 'Query wasn\'t executed',
              Error: e.message,
            });
          }
        });
      }
      // eslint-disable-next-line use-isnan
    }
    if (customFunc.isEmpty(urlQuery)) {
      const args = [];
      args.push(decoded.name);
      if (decoded.admin === true) {
        pool.connect(async (err, client) => {
          if (err) return res.status(501).json({ message: 'Internal Database Error' });
          const selectResultSet = await client.query(queries.getAllsalesRecordCount);
          res.status(200).json({
            message: 'Showing pages All sales record',
            salesRecords: selectResultSet.rows,
          });
        });
      }
      if (decoded.admin === false) {
        pool.connect(async (err, client) => {
          if (err) return res.status(501).json({ message: 'Internal Database Error' });
          const selectResultSet = await client.query(queries.selectAllSalesRecordFilterByCreatorWithoutPagination, args);
          if (selectResultSet.rowCount === 0) return res.status(404).json({ message: 'No sales Recrod for this user' });
          res.status(200).json({
            message: 'Showing pages All sales record',
            salesRecords: selectResultSet.rows,
          });
        });
      }
    }
    // } else {
    //   return res.status(400).json({ message: 'Invalid Token' });
    // }
  } else {
    return res.status(401).json({ message: 'No access token provided! Unaccessible resource' });
  }
};


salesImpl.getSalesRecordById = (req, res) => {
  // const result = Joi.validate(req.params.salesrecord_id, schema3);
  // if (result.error === null) {
  const token = req.header('x-auth-token');
  const args = [req.params.id];
  pool.connect(async (err, client) => {
    if (err) { return res.status(501).json({ message: 'Somethings up with the database!' }); }
    try {
      const queryResult = await client.query(queries.selectSalesRecordById, args);
      const decoded = jwt.verify(token, process.env.JWTKEY);
      if (queryResult.rowCount === 1) {
        if (decoded.name === queryResult.rows[0].attendant_name || decoded.admin === true) {
          res.status(200).json({
            message: 'Sales Record Found!',
            record: queryResult.rows,
          });
          res.end();
        } else {
          return res.status(403).json({ message: 'Forbidden! You need to have appropraite privileges' });
        }
      }
      if (queryResult.rowCount === 0) {
        return res.status(404).json({ message: 'Record doesn\'t exist!' });
      }
    } catch (er) {
      return res.status(404).json({
        message: 'Something went wrong: Couldn\'t acess the Record',
        ErrorMessage: er.message,
      });
    }
  });
};

export default salesImpl;
