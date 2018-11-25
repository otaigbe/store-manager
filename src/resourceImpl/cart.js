import customFunc from '../utils/functions';
import queries from '../dbUtils/queries/queries';
import pool from '../dbUtils/dbConnection';

const cartImpl = {};
cartImpl.getAllProducts = async (req, res) => {
  const urlQuery = req.query;
  const args = [];
  if (!customFunc.isEmpty(urlQuery)) {
    const page = req.query.pageNumber;
    const itemsPerPage = 5;
    const pageOffset = (page - 1) * itemsPerPage;
    args.push(itemsPerPage);
    args.push(pageOffset);
    try {
      const count = await pool.query(queries.countAllProducts);
      const selectResultSet = await pool.query(queries.selectProductsWithPagination, args);
      res.status(200).json({
        message: `Showing pages ${page} of ${count.rows.length}`,
        Products: selectResultSet.rows,
      });
    } catch (error) {
      /* istanbul ignore next */
      res.status(501).json({
        message: 'Query wasn\'t executed',
        Error: error.message,
      });
    }
  } else {
    try {
      const selectResultSet = await pool.query(queries.selectProductsWithoutPagination);
      res.status(200).json({
        message: 'Showing pages All Products',
        Products: selectResultSet.rows,
      });
    } catch (error) {
      /* istanbul ignore next */
      res.status(501).json({
        message: 'Query wasn\'t executed',
        Error: error.message,
      });
    }
  }
};

export default cartImpl;
