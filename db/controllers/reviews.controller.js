const { selectReviewByID } = require("../models/reviews.model");

exports.getReviewByID = (req, res, next) => {
  const { review_id } = req.params;
  console.log(review_id);
  selectReviewByID(review_id).then((review) => {
    res.status(200).send({ review });
  });
};
