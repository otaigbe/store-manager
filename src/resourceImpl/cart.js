import customFunc from '../utils/functions';
import queries from '../dbUtils/queries/queries';
import asyncMiddleware from '../middleware/async';
import usefulFunctions from './ImplFunctions';

const cartImpl = {};
cartImpl.getAllProducts = asyncMiddleware(async (req, res) => {
  const urlQuery = req.query;
  if (!customFunc.isEmpty(urlQuery)) {
    const args = [];
    const page = urlQuery.pageNumber;
    usefulFunctions.fetchAllStuffWithPagination(res, page, queries.countAllProducts, queries.getProductsWithPagination, args);
  } else {
    usefulFunctions.fetchAllStuffWithoutPagination(res, queries.getProductsWithoutPagination);
  }
});

export default cartImpl;
