/* eslint-disable consistent-return */
import format from 'pg-format';
import jwt from 'jsonwebtoken';
import customFunc from '../utils/functions';
import queries from '../dbUtils/queries/queries';
import pool from '../dbUtils/dbConnection';
import asyncMiddleware from '../middleware/async';
import usefulFunctions from './ImplFunctions';


const salesImpl = {};
salesImpl.createSalesRecord = asyncMiddleware(async (req, res) => {
  const records = [];
  for (let i = 0; i < req.body.salesRecords.length; i += 1) {
    const inner = [];
    inner.push(req.body.salesRecords[i].product_id, req.body.salesRecords[i].product_desc, req.body.salesRecords[i].unit_price, req.body.salesRecords[i].quantity_bought, req.body.salesRecords[i].amount, req.body.attendant_name, req.body.receiptNumber);
    records.push(inner);
  }
  const multiInsert = format('INSERT INTO salesRecords (product_id, product_desc, unit_price, quantity_bought, amount, attendant_name, receipt_number) VALUES %L', records);
  const insertResult = await pool.query(multiInsert);
  return res.status(201).json({ message: 'Records saved' });
});


salesImpl.getAllSalesRecords = asyncMiddleware(async (req, res) => {
  const token = req.header('x-auth-token');
  if (token) {
    const decoded = jwt.verify(token, process.env.JWTKEY);
    if (!customFunc.isEmpty(req.query)) {
      if (decoded.admin === true) {
        const args = [];
        usefulFunctions.fetchAllStuffWithPagination(res, req.query.pageNumber, queries.getAllsalesRecordCount, queries.selectAllSalesRecordWithPagination, args);
      }
      if (decoded.admin === false) {
        const args = [decoded.name];
        usefulFunctions.fetchAllStuffWithPagination(res, req.query.pageNumber, queries.getAllsalesRecordCount, queries.selectAllSalesRecordFilterByCreatorWithPagination, args);
      }
    }
    if (customFunc.isEmpty(req.query)) {
      if (decoded.admin === true) {
        usefulFunctions.fetchAllStuffWithoutPagination(res, queries.getAllsalesRecordCount);
      }
      if (decoded.admin === false) {
        const args = [decoded.name];
        usefulFunctions.fetchAllStuffWithoutPaginationFilterWithCreator(res, queries.selectAllSalesRecordFilterByCreator, args);
      }
    }
  } else {
    return res.status(401).json({ message: 'No access token provided! Unaccessible resource' });
  }
});


salesImpl.getSalesRecordById = asyncMiddleware(async (req, res) => {
  const args = [req.params.id];
  usefulFunctions.getResourceById(res, queries.selectSalesRecordById, args);
});

export default salesImpl;
