/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
import Joi from 'joi';
import customFunc from '../utils/functions';
import errorHandler from '../utils/errorHandler';
import queries from '../dbUtils/queries/queries';
import pool from '../dbUtils/dbConnection';
import 'babel-polyfill';

const productImpl = {};
const schema = Joi.object({
  product_desc: Joi.string().min(3).required(),
  unit_price: Joi.number().required(),
  quantity_supplied: Joi.number().required(),
  supplier_name: Joi.string().required(),
  category: Joi.string().required(),
});

const schema2 = Joi.object({
  product_id: Joi.number().required(),
  product_desc: Joi.string().min(3).required(),
  unit_price: Joi.number().required(),
  quantity_supplied: Joi.number().required(),
  supplier_name: Joi.string().required(),
  category: Joi.string().required(),
});

const schema3 = Joi.object({
  product_id: Joi.number().required(),
});
productImpl.addProduct = async (req, res) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    const productDesc = req.body.product_desc;
    const unitPrice = req.body.unit_price;
    const quantitySupplied = req.body.quantity_supplied;
    const supplierName = req.body.supplier_name;
    const category = req.body.category;
    const temp3 = [productDesc, unitPrice, quantitySupplied, supplierName, category];
    const temp = [productDesc];
    try {
      const resultSet = await pool.query(queries.selectProductIfExist, temp);
      if (resultSet.rowCount === 1) {
        const currentQuantityInStock = resultSet.rows[0].quantity_in_stock;
        console.log(currentQuantityInStock);
        const temp2 = [Number(quantitySupplied) + Number(currentQuantityInStock), productDesc, unitPrice];
        const updateResult = await pool.query(queries.updateProductDuringCreation, temp2);
        return res.status(200).json({ message: 'Updated an already existent product.' });
      }
      /* istanbul ignore next */
      if (resultSet.rowCount === 0) {
        const insertResultSet = await pool.query(queries.insertProduct, temp3);
        return res.status(201).json({
          message: 'Created a new product.',
          Resource: req.body,
        });
      }
    } catch (error) {
      /* istanbul ignore next */
      res.status(501).json({ message: error.message });
    }
  } else {
    return res.status(422).json({
      message: 'Something wrong with input!',
      Error: result.error,
    });
  }
};

productImpl.getAllProducts = (req, res) => {
  try {
    const urlQuery = req.query;
    const args = [];
    if (!customFunc.isEmpty(urlQuery)) {
      const page = req.query.pageNumber;
      const itemsPerPage = 5;
      const pageOffset = (page - 1) * itemsPerPage;
      args.push(itemsPerPage);
      args.push(pageOffset);
      pool.connect(async (err, client) => {
        /* istanbul ignore next */
        if (err) errorHandler.connectionError(err, res);
        const count = await client.query(queries.countAllProducts);
        const selectResultSet = await client.query(queries.selectProductsWithPagination, args);
        res.status(200).json({
          message: `Showing pages ${page} of ${count.rows.length}`,
          Products: selectResultSet.rows,
        });
      });
    } else {
      pool.connect(async (error, client) => {
        /* istanbul ignore next */
        if (error) errorHandler.connectionError(error, res);
        const selectResultSet = await client.query(queries.selectProductsWithoutPagination);
        res.status(200).json({
          message: 'Showing pages All Products',
          Products: selectResultSet.rows,
        });
      });
    }
  } catch (e) {
    /* istanbul ignore next */
    res.status(501).json({
      message: 'Query wasn\'t executed',
      Error: e.message,
    });
  }
};


productImpl.modifyAProduct = async (req, res) => {
  const result = Joi.validate(req.body, schema2);
  if (result.error === null) {
    const args = [req.body.product_id, req.body.product_desc, req.body.unit_price, req.body.quantity_supplied, req.body.supplier_name, req.body.category];
    const temp = [req.params.id, req.body.product_desc];
    try {
      const queryResult = await pool.query(queries.checkIfAProductExist, temp);
      if (queryResult.rowCount === 1) {
        const updateResult = await pool.query(queries.updateProduct, args);
        return res.status(200).json({ message: 'Product Modified' });
      }
      /* istanbul ignore next */
      if (queryResult.rowCount === 0) {
        return res.status(404).json({ message: 'Product doesn\'t exist! Create the Product' });
      }
    } catch (error) {
      /* istanbul ignore next */
      return res.status(501).json({
        message: 'Something went wrong: Couldn\'t modify the product',
        ErrorMessage: error.message,
      });
    }
  } else {
    return res.status(422).json({
      message: 'Validation error! Please check your input',
      ErrorMessage: result.error,
    });
  }
};


productImpl.deleteProduct = async (req, res) => {
  const args = [req.params.id];
  try {
    const queryResult = await pool.query(queries.selectProductById, args);
    if (queryResult.rowCount === 1) {
      await pool.query(queries.deleteProduct, args);
      return res.status(200).json({ message: 'Product Deleted' });
    }
    /* istanbul ignore next */
    if (queryResult.rowCount === 0) {
      return res.status(404).json({ message: 'Product doesn\'t exist! Nothing to Delete' });
    }
  } catch (error) {
    /* istanbul ignore next */
    return res.status(501).json({
      message: 'Something went wrong: Couldn\'t delete the product',
      ErrorMessage: error.message,
    });
  }
};

productImpl.getProductById = (req, res) => {
  const args = [req.params.id];
  pool.connect(async (err, client) => {
    /* istanbul ignore next */
    if (err) errorHandler.connectionError(err, res);
    try {
      const queryResult = await client.query(queries.selectProductById, args);
      if (queryResult.rowCount === 1) {
        return res.status(200).json({
          message: 'Product Found!',
          Product: queryResult.rows,
        });
      }
      /* istanbul ignore next */
      if (queryResult.rowCount === 0) {
        return res.status(404).json({ message: 'Product doesn\'t exist!' });
      }
    } catch (er) {
      /* istanbul ignore next */
      return res.status(404).json({
        message: 'Something went wrong: Couldn\'t acess the product',
        ErrorMessage: er.message,
      });
    }
  });
};
export default productImpl;
