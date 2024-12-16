const Response = require("./response");
const mongoLogger = require("./mongoLogger");

module.exports = (error, req, res, next) => {
  error.route = req.originalUrl ? req.originalUrl : "unknown";
  mongoLogger.storeError(error);

  res
    .status(error.status || 500)
    .json(new Response(error.message, error.status || 500));
};
