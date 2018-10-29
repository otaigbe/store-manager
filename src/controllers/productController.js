import products from '../dataholder/productStore';

const productControlObj = {};

productControlObj.createProduct = (req, res) => {
  const resource = req.body;
  // console.log(req.body);
  products.push(req.body);
  return res.status(201).json({
    message: 'Successfully added product',
    'resource-created': resource,
  });
};

productControlObj.getAllProducts = (req, res) => res.status(302).json(products);

productControlObj.getProductById = (req, res) => {
  products.find((element) => {
    if (Number(element.Id) === Number(req.params.id)) {
      return res.status(302).json({
        message: 'resource found',
        resource: element,
      });
    }
  });
};

export default productControlObj;
