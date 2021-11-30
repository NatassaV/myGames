const express = require("express");

const reviewsRouter = express.Router();
const { getReviewByID } = require("../controllers/reviews.controller");

console.log("inside reviews router");

reviewsRouter.route("/:review_id").get(getReviewByID);

module.exports = reviewsRouter;
