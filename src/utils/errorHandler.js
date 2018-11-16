const errorHandler = {};

errorHandler.connectionError = (err, res) => {
  /* istanbul ignore next */
  res.status(501).json({
    message: err.message,
    ErrorMessage: err,
  });
};

export default errorHandler;
