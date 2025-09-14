
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  let status = err.statusCode || 500;
  let message = err.message || 'Server Error';
  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }
  res.status(status).json({ message });
};

export default errorHandler;
