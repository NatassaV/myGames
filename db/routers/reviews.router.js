const express = require("express");

const reviewsRouter = express.Router();
const {
  getReviewByID,
  patchReviewByID,
} = require("../controllers/reviews.controller");

console.log("inside reviews router");

reviewsRouter.route("/:review_id").get(getReviewByID).patch(patchReviewByID);

module.exports = reviewsRouter;
