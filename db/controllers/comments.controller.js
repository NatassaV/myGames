const {
  selectCommentsByReviewId,
  insertNewComment,
  deleteComment,
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

exports.removeComment = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComment(comment_id).then(() => {
    res.status(204).send("");
  });
};
