const {
  selectReviewByID,
  updateReviewByID,
  selectReviews,
  myTest,
} = require("../models/reviews.model");

exports.getReviewByID = (req, res, next) => {
  const { review_id } = req.params;
  selectReviewByID(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      if (err.code == "22P02") {
        res.status(400).send({ msg: "oh no, that looks wrong!" });
      }
    });
};

exports.patchReviewByID = (req, res, next) => {
  const { body } = req;
  const { review_id } = req.params;
  updateReviewByID(review_id, body)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      if (err.code == "22P02") {
        res.status(400).send({ msg: "oh no, that looks wrong!" });
      } else {
        res.status(500).send({ msg: "internal server error!" });
      }
    });
};

exports.getReviews = (req, res, next) => {
  const { sort_by } = req.query;
  const { order } = req.query;
  const { category } = req.params;
  selectReviews(sort_by, order, category)
    .then((reviews) => {
      res.status(200).send({ reviews: reviews });
    })
    .catch((err) => {
      console.log(err);
      if (err.code) {
        res.status(400).send({ msg: "oh no, that looks wrong!" });
      } else {
        res.status(500).send({ msg: "internal server error!" });
      }
    });
};
