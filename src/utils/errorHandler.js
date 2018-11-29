const errorHandler = {};

errorHandler.connectionError = (err, res) => {
  /* istanbul ignore next */
  res.status(501).json({
    message: err.message,
    ErrorMessage: err,
  });
};

errorHandler.validationError = (res, result) => {
  /* istanbul ignore next */
  return res.status(422).json({
    message: 'Something wrong with input!',
    Error: result.error,
  });
};

errorHandler.notFoundError = (res) => {
  return res.status(404).json({
    message: 'User doesn"t exist! Enter valid email and password',
  });
};

export default errorHandler;
