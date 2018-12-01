import pool from '../dbUtils/dbConnection';
import 'babel-polyfill';

const usefulFunctions = {};
usefulFunctions.fetchAllStuffWithPagination = async (res, page, query1, query2, args) => {
  const itemsPerPage = 5;
  const pageOffset = (page - 1) * itemsPerPage;
  args.push(itemsPerPage);
  args.push(pageOffset);
  const count = await pool.query(query1);
  const selectResultSet = await pool.query(query2, args);
  res.status(200).json({
    message: `Showing pages ${page} of ${count.rows.length / page}`,
    Resources: selectResultSet.rows,
  });
};

usefulFunctions.fetchAllStuffWithoutPagination = async (res, query) => {
  const selectResultSet = await pool.query(query);
  res.status(200).json({
    message: 'Showing pages All Products',
    Resources: selectResultSet.rows,
  });
};

usefulFunctions.fetchAllStuffWithoutPaginationFilterWithCreator = async (res, query, args) => {
  const selectResultSet = await pool.query(query, args);
  res.status(200).json({
    message: 'Showing pages All Products',
    Resources: selectResultSet.rows,
  });
};

usefulFunctions.getResourceById = async (res, query, args) => {
  const queryResult = await pool.query(query, args);
  if (queryResult.rowCount === 1) {
    return res.status(200).json({
      message: 'Resource Found!',
      Resource: queryResult.rows,
    });
  }
  /* istanbul ignore next */
  if (queryResult.rowCount === 0) {
    return res.status(404).json({ message: 'Resource doesn\'t exist!' });
  }
};


usefulFunctions.setCookieAndRedirect = (res, token, url) => {
  res.cookie('x-auth-token', token);
  res.redirect(url);
};
export default usefulFunctions;
