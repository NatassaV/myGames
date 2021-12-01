const {
  selectReviewByID,
  updateReviewByID,
  selectReviews,
} = require("../models/reviews.model");

exports.getReviewByID = (req, res, next) => {
  const { review_id } = req.params;

  selectReviewByID(review_id).then((review) => {
    res.status(200).send({ review });
  });
};

exports.patchReviewByID = (req, res, next) => {
  const { body } = req;
  const { review_id } = req.params;
  updateReviewByID(review_id, body).then((review) => {
    res.status(200).send({ review });
  });
};

exports.getReviews = (req, res, next) => {
  selectReviews()
    .then((reviews) => {
      res.status(200).send({ reviews: reviews });
    })
    .catch((err) => {
      console.log(err);
    });
};
