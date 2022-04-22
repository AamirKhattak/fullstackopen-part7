const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
var morgan = require("morgan");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });
// ###########################################################<start> MORGAN
// LOGGING using tiny config, for all methods except POST
app.use(
  morgan("tiny", {
    skip: (req) => req.method === "POST",
  })
);

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

//only to log POST requests
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body",
    {
      skip: (req) => req.method !== "POST",
    }
  )
);
// ###########################################################<end> MORGAN

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use(middleware.requestLogger);

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
// app.use(middleware.tokenExtractor)
app.use("/api/blogs", blogRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
