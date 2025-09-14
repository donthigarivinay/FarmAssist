// middlewares/errorHandler.js

// Custom Error Class (optional)
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  // If error is not an AppError, wrap it
  if (!(err instanceof AppError)) {
    err = new AppError(err.message || "Something went wrong!", err.statusCode || 500);
  }

  console.error("Error 💥:", err);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = { AppError, errorHandler };
