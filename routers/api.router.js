const express = require("express");
const endpoints = require("../endpoints.json");
const apiRouter = express.Router();

const categoriesRouter = require("./categories.router");
const reviewsRouter = require("./reviews.router");
const commentsRouter = require("./comments.router");

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);

apiEndpoints = (req, res, next) => {
  res.status(200).send({ endpoints: {"Here are some endpoints you can use" : endpoints });
};

apiRouter.use("", apiEndpoints);

module.exports = apiRouter;
