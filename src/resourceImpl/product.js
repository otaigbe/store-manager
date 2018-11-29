/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
import Joi from 'joi';
import format from 'pg-format';
import customFunc from '../utils/functions';
import errorHandler from '../utils/errorHandler';
import queries from '../dbUtils/queries/queries';
import pool from '../dbUtils/dbConnection';
import asyncMiddleware from '../middleware/async';
import usefulFunctions from './ImplFunctions';
import schemas from '../utils/validationSchemas';
import 'babel-polyfill';

const productImpl = {};
productImpl.addProduct = asyncMiddleware(async (req, res) => {
  const result = Joi.validate(req.body, schemas.createProductSchema);
  if (result.error === null) {
    const temp3 = [req.body.product_desc, req.body.unit_price, req.body.quantity_in_stock, req.body.quantity_supplied, req.body.supplier_name, req.body.category];
    const temp = [req.body.product_desc];
    const resultSet = await pool.query(queries.selectProductIfExist, temp);
    if (resultSet.rowCount === 1) {
      return res.status(200).json({ message: 'Product already exists Modify instead.' });
    }
    /* istanbul ignore next */
    if (resultSet.rowCount === 0) {
      const insertResultSet = await pool.query(queries.insertProduct, temp3);
      return res.status(201).json({
        message: 'Created a new product.',
        Resource: req.body,
      });
    }
  } else {
    errorHandler.validationError(res, result);
  }
});

productImpl.getAllProducts = asyncMiddleware((req, res) => {
  const urlQuery = req.query;
  if (!customFunc.isEmpty(urlQuery)) {
    const args = [];
    const page = urlQuery.pageNumber;
    usefulFunctions.fetchAllStuffWithPagination(res, page, queries.countAllProducts, queries.getProductsWithPagination, args);
  } else {
    usefulFunctions.fetchAllStuffWithoutPagination(res, queries.getProductsWithoutPagination);
  }
});

productImpl.modifyAProduct = asyncMiddleware(async (req, res) => {
  const result = Joi.validate(req.body, schemas.ModifyProductSchema);
  if (result.error === null) {
    const args = [req.body.product_id, req.body.product_desc, req.body.unit_price, req.body.quantity_in_stock, req.body.quantity_supplied, req.body.supplier_name, req.body.category];
    const temp = [req.params.id, req.body.product_desc];
    const queryResult = await pool.query(queries.checkIfAProductExist, temp);
    if (queryResult.rowCount === 1) {
      const updateResult = await pool.query(queries.updateProduct, args);
      return res.status(200).json({ message: 'Product Modified' });
    }
    /* istanbul ignore next */
    if (queryResult.rowCount === 0) {
      return res.status(404).json({ message: 'Product doesn\'t exist! Create the Product' });
    }
  } else {
    errorHandler.validationError(res, result);
  }
});

productImpl.deleteProduct = asyncMiddleware(async (req, res) => {
  const args = [req.params.id];
  const queryResult = await pool.query(queries.selectProductById, args);
  if (queryResult.rowCount === 1) {
    await pool.query(queries.deleteProduct, args);
    return res.status(200).json({ message: 'Product Deleted' });
  }
  /* istanbul ignore next */
  if (queryResult.rowCount === 0) {
    return res.status(404).json({ message: 'Product doesn\'t exist! Nothing to Delete' });
  }
});

productImpl.getProductById = asyncMiddleware((req, res) => {
  const args = [req.params.id];
  usefulFunctions.getResourceById(res, queries.selectProductById, args);
});

/* istanbul ignore next */
productImpl.modifyProductQuantityAfterSale = asyncMiddleware(async (req, res) => {
  const args = req.body;
  const sql = format('update products as p set quantity_in_stock = quantity_in_stock - CAST(q.qty_bought AS INTEGER) from (values %L) as q(qty_bought, product_id) where CAST(q.product_id AS INTEGER) = p.product_id;', args);
  // console.log(sql);
  const updateResult = await pool.query(sql);
  return res.status(200).json({ message: 'Product Modified' });
});

export default productImpl;
