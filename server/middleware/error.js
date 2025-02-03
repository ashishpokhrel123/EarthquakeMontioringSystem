
const httpStatus = require("http-status");
const config = require("../config/keys");
const ApiError = require("../utils/Error/ApiError");

const errorConverter = (error, req, res, next) => {
  let err = error;
  if (!(err instanceof ApiError)) {
    const statusCode =
      err.statusCode 
        ? 400
        : 500;
    const message = err.message || httpStatus[statusCode];
    err = new ApiError(statusCode, message, false, error.stack);
  }
  next(err);
};

const errorHandler = (error, req, res, next) => {
  let { statusCode, message } = error;
  if ((config.env = "production" && !error.isOperational)) {
    (statusCode = 500),
      (message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]);
  }

  res.locals.errorMessage = error.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === "development" && { stack: err.stack }),
  };

  if ((config.env = "development")) {
    console.log(error);
  }
  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};