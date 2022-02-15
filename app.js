const express = require("express");
const app = express();
const apiRouter = require("./routers/api.router");
const {
  handlePsqlErrors400,
  handleCustomErrors,
  handle500Errors,
  handlesInvalidPaths,
} = require("./errors");

app.use(express.json());
app.use("/api", apiRouter);
app.all("/*", handlesInvalidPaths);
app.use(handleCustomErrors);
app.use(handlePsqlErrors400);
app.use(handle500Errors);

module.exports = app;
