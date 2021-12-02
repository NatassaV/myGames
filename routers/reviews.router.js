const express = require("express");

const reviewsRouter = express.Router();
const {
  getReviewByID,
  patchReviewByID,
  getReviews,
} = require("../controllers/reviews.controller");

const {
  getCommentsByReviewID,
  postNewComment,
} = require("../controllers/comments.controller");

console.log("inside reviews router");

reviewsRouter.route("/").get(getReviews);
reviewsRouter.route("/:review_id").get(getReviewByID).patch(patchReviewByID);
reviewsRouter
  .route("/:review_id/comments")
  .get(getCommentsByReviewID)
  .post(postNewComment);

module.exports = reviewsRouter;
