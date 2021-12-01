const {
  selectCommentsByReviewId,
  insertNewComment,
} = require("../models/comments.model");

exports.getCommentsByReviewID = (req, res, next) => {
  const { review_id } = req.params;
  selectCommentsByReviewId(review_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postNewComment = (req, res, next) => {
  const { review_id } = req.params;
  const { body } = req;
  insertNewComment(review_id, body).then((comment) => {
    res.status(201).send({ comment });
  });
};
