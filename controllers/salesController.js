import salesrecords from '../dataholder/salesrecords';

const controllerObj = {};
controllerObj.getSalesRecordById = (req, res) => {
  for (let i = 0; i < salesrecords.length; i += 1) {
    if (Number(salesrecords[i].salesRecordId) === Number(req.params.id)) {
      res.status(200).json(salesrecords[i]);
    }
  }
};

controllerObj.createSalesRecord = (req, res) => {
  const resource = req.body;
  console.log(req.body);
  // console.log(salesrecords);
  salesrecords.push(req.body);
  return res.status(201).json({
    message: 'Successfully added product',
    'resource-created': resource,
  });
};

controllerObj.getAllSalesRecord = (req, res) => {
  res.status(200).json(salesrecords);
};

export default controllerObj;
