/* eslint-disable consistent-return */
import Joi from 'joi';
import { queries, pool } from '../dbUtils/queries/queries';

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
productImpl.addProduct = (req, res) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    const productDesc = req.body.product_desc;
    const unitPrice = req.body.unit_price;
    const quantitySupplied = req.body.quantity_supplied;
    const supplierName = req.body.supplier_name;
    const category = req.body.category;
    const temp3 = [productDesc, unitPrice, quantitySupplied, supplierName, category];
    const temp = [productDesc];
    pool.connect(async (err, client) => {
      if (err) { return res.status(501).json({ message: err.message }); }
      try {
        const resultSet = await client.query(queries.selectProductIfExist, temp);
        if (resultSet.rowCount === 1) {
          const currentQuantityInStock = resultSet.rows[0].quantity_in_stock;
          console.log(currentQuantityInStock);
          const temp2 = [Number(quantitySupplied) + Number(currentQuantityInStock), productDesc, unitPrice];
          // console.log(temp2);
          const updateResult = await client.query(queries.updateProductDuringCreation, temp2);
          return res.status(200).json({ message: 'Updated an already existent product.' });
        }
        if (resultSet.rowCount === 0) {
          const insertResultSet = await client.query(queries.insertProduct, temp3);
          return res.status(201).json({
            message: 'Created a new product.',
            Resource: req.body,
          });
        }
      } catch (error) {
        return res.status(501).json({ message: error.message });
      }
    });
  } else {
    return res.status(422).json({
      message: 'Something wrong with input!',
      Error: result.error,
    });
  }
};

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
productImpl.getAllProducts = (req, res) => {
  const urlQuery = req.query;
  const args = [];
  if (!isEmpty(urlQuery)) {
    const page = req.query.pageNumber;
    const itemsPerPage = 5;
    const pageOffset = (page - 1) * itemsPerPage;
    args.push(itemsPerPage);
    args.push(pageOffset);
    pool.connect(async (err, client) => {
      if (err) return res.status(501).json({ message: 'Internal Database Error' });
      try {
        const count = await client.query(queries.countAllProducts);
        const selectResultSet = await client.query(queries.selectProductsWithPagination, args);
        res.status(200).json({
          message: `Showing pages ${page} of ${count.rows.length}`,
          Products: selectResultSet.rows,
        });
      } catch (e) {
        res.status(501).json({
          message: 'Query wasn\'t executed',
          Error: e.message,
        });
      }
    });
  } else {
    pool.connect(async (error, client) => {
      if (error) {
        console.log(error);
        return res.status(501).json({ message: 'Internal Database Error' });
      }
      const selectResultSet = await client.query(queries.selectProductsWithoutPagination);
      res.status(200).json({
        message: 'Showing pages All Products',
        Products: selectResultSet.rows,
      });
    });
  }
};


productImpl.modifyAProduct = (req, res) => {
  const result = Joi.validate(req.body, schema2);
  if (result.error === null) {
    const args = [req.params.id, req.body.product_desc, req.body.unit_price, req.body.quantity_supplied, req.body.supplier_name, req.body.category];
    const temp = [req.params.id, req.body.product_desc];
    pool.connect(async (err, client) => {
      if (err) { return res.status(501).json({ message: 'Somethings up with the database!' }); }
      try {
        const queryResult = await client.query(queries.checkIfAProductExist, temp);
        if (queryResult.rowCount === 1) {
          try {
            const updateResult = await client.query(queries.updateProduct, args);
            res.status(200).json({ message: 'Product Modified' });
          } catch (e) {
            return res.status(404).json({
              message: 'Something went wrong: Couldn\'t modify the product',
              ErrorMessage: e.message,
            });
          }
        }
        if (queryResult.rowCount === 0) {
          return res.status(404).json({ message: 'Product doesn\'t exist! Create the Product' });
        }
      } catch (er) {
        return res.status(404).json({
          message: 'Something went wrong: Couldn\'t modify the product',
          ErrorMessage: er.message,
        });
      }
    });
  } else {
    return res.status(404).json({
      message: 'Validation error! Please check your input',
      ErrorMessage: result.error,
    });
  }
};


productImpl.deleteProduct = (req, res) => {
  const result = Joi.validate(req.body, schema3);
  if (result.error === null) {
    const args = [req.params.id];
    pool.connect(async (err, client) => {
      if (err) { return res.status(501).json({ message: 'Somethings up with the database!' }); }
      try {
        const queryResult = await client.query(queries.selectProductById, args);
        if (queryResult.rowCount === 1) {
          try {
            const updateResult = await client.query(queries.deleteProduct, args);
            res.status(200).json({ message: 'Product Deleted' });
          } catch (e) {
            return res.status(404).json({
              message: 'Something went wrong: Didn\'t delete the product',
              ErrorMessage: e.message,
            });
          }
        }
        if (queryResult.rowCount === 0) {
          return res.status(404).json({ message: 'Product doesn\'t exist! Nothing to Delete' });
        }
      } catch (er) {
        return res.status(404).json({
          message: 'Something went wrong: Couldn\'t modify the product',
          ErrorMessage: er.message,
        });
      }
    });
  } else {
    return res.status(422).json({
      message: 'Validation error! Please check your input',
      ErrorMessage: result.error,
    });
  }
};

productImpl.getProductById = (req, res) => {
  const result = Joi.validate(req.params.product_id, schema3);
  if (result.error === null) {
    const args = [req.params.id];
    pool.connect(async (err, client) => {
      if (err) { return res.status(501).json({ message: 'Somethings up with the database!' }); }
      try {
        const queryResult = await client.query(queries.selectProductById, args);
        if (queryResult.rowCount === 1) {
          return res.status(200).json({
            message: 'Product Found!',
            Product: queryResult.rows,
          });
        }
        if (queryResult.rowCount === 0) {
          return res.status(404).json({ message: 'Product doesn\'t exist!' });
        }
      } catch (er) {
        return res.status(404).json({
          message: 'Something went wrong: Couldn\'t acess the product',
          ErrorMessage: er.message,
        });
      }
    });
  } else {
    return res.status(422).json({
      message: 'Validation error! Please check your input',
      ErrorMessage: result.error,
    });
  }
};
export default productImpl;
