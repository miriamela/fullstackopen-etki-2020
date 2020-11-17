const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  next();
};
const errorHandler = (error, request, response, next) => {
  if (error.message === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.message === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.message === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  } else {
    logger.error(error.message);
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
