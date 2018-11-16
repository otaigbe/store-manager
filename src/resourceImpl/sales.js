/* eslint-disable consistent-return */
import format from 'pg-format';
import jwt from 'jsonwebtoken';
import customFunc from '../utils/functions';
import queries from '../dbUtils/queries/queries';
import pool from '../dbUtils/dbConnection';

const salesImpl = {};
salesImpl.createSalesRecord = async (req, res) => {
  const records = [];
  for (let i = 0; i < req.body.salesRecords.length; i += 1) {
    const inner = [];
    inner.push(req.body.salesRecords[i].product_id, req.body.salesRecords[i].product_desc, req.body.salesRecords[i].unit_price, req.body.salesRecords[i].quantity_bought, req.body.salesRecords[i].amount, req.body.salesRecords[i].attendant_id, req.body.salesRecords[i].attendant_name);
    records.push(inner);
  }
  const multiInsert = format('INSERT INTO salesRecords (product_id, product_desc, unit_price, quantity_bought, amount, attendant_id, attendant_name) VALUES %L', records);
  try {
    const insertResult = await pool.query(multiInsert);
    return res.status(201).json({ message: 'Records saved' });
  } catch (error) {
    /* istanbul ignore next */
    return res.status(501).send('Something is wrong! Unable to save sales records to the database');
  }
};


salesImpl.getAllSalesRecords = async (req, res) => {
  const token = req.header('x-auth-token');
  if (token) {
    const args = [];
    const urlQuery = req.query;
    const itemsPerPage = 5;
    const page = req.query.pageNumber;
    const pageOffset = (Number(page) - 1) * itemsPerPage;
    args.push(itemsPerPage);
    args.push(pageOffset);
    const decoded = jwt.verify(token, process.env.JWTKEY);
    if (!customFunc.isEmpty(urlQuery)) {
      console.log(args);
      if (decoded.admin === true) {
        const count = await pool.query(queries.getAllsalesRecordCount);
        const selectResultSet = await pool.query(queries.selectAllSalesRecordWithPagination, args);
        res.status(200).json({
          message: `Showing pages ${page} of ${count.rows.length}`,
          salesRecords: selectResultSet.rows,
        });
      }
      if (decoded.admin === false) {
        // console.log(decoded.name);
        const array = [decoded.name, itemsPerPage, pageOffset];
        const array3 = [decoded.name];
        try {
          args.push(decoded.attendant_id);
          console.log(args);
          const count = await pool.query(queries.selectAllSalesRecordFilterByCreator, array3);
          const selectResultSet = await pool.query(queries.selectAllSalesRecordFilterByCreatorWithPagination, array);
          res.status(200).json({
            message: `Showing pages ${page} of ${count.rows.length}`,
            salesRecords: selectResultSet.rows,
          });
        } catch (error) {
          /* istanbul ignore next */
          res.status(501).json({
            message: 'Query wasn\'t executed',
            Error: error.message,
          });
        }
      }
    }
    if (customFunc.isEmpty(urlQuery)) {
      const args2 = [];
      args2.push(decoded.name);
      if (decoded.admin === true) {
        try {
          const selectResultSet = await pool.query(queries.getAllsalesRecordCount);
          res.status(200).json({
            message: 'Showing All sales record',
            salesRecords: selectResultSet.rows,
          });
        } catch (error) {
          /* istanbul ignore next */
          res.status(501).json({
            message: 'Query wasn\'t executed',
            Error: error.message,
          });
        }
      }
      if (decoded.admin === false) {
        const selectResultSet = await pool.query(queries.selectAllSalesRecordFilterByCreator, args2);
        /* istanbul ignore next */
        if (selectResultSet.rowCount === 0) return res.status(404).json({ message: 'No sales Recrod for this user' });
        res.status(200).json({
          message: 'Showing All sales record',
          salesRecords: selectResultSet.rows,
        });
      }
    }
  } else {
    return res.status(401).json({ message: 'No access token provided! Unaccessible resource' });
  }
};


salesImpl.getSalesRecordById = async (req, res) => {
  const args = [req.params.id];
  const queryResult = await pool.query(queries.selectSalesRecordById, args);
  try {
    if (queryResult.rowCount === 1) {
      res.status(200).json({
        message: 'Sales Record Found!',
        record: queryResult.rows,
      });
    }
    if (queryResult.rowCount === 0) {
      return res.status(404).json({ message: 'Record doesn\'t exist!' });
    }
  } catch (error) {
    /* istanbul ignore next */
    return res.status(404).json({
      message: 'Something went wrong: Couldn\'t acess the Record',
      ErrorMessage: error.message,
    });
  }
};

export default salesImpl;
