const express = require("express");
const app = express();
const apiRouter = require("./routers/api.router");
const {
  handlePsqlErrors400,
  handleCustomErrors,
  handle500Errors,
  handlesInvalidPaths,
} = require("./errors");
const endpoints = require("../endpoints.json");

const apiEndpoints = (req, res, next) => {
  res.status(200).send({ "Here are some endpoints you can use": endpoints });
};
app.get(express.json());
apiRouter.use("/", apiEndpoints);

app.use("/api", apiRouter);
app.all("/*", handlesInvalidPaths);
app.use(handleCustomErrors);
app.use(handlePsqlErrors400);
app.use(handle500Errors);

module.exports = app;
