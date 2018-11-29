export default function (err, req, res, next) {
  res.status(501).json({
    message: 'Something went wrong!',
    Error: err.message,
  });
}
