const db = require("../connection");

exports.selectCommentsByReviewId = (review_id) => {
  return db
    .query("SELECT * FROM comments WHERE review_id = $1;", [review_id])
    .then(({ rows }) => {
      return rows;
    });
};

exports.insertNewComment = (review_id, { username, body }) => {
  return db
    .query(
      "INSERT INTO comments (author, body, review_id) VALUES($1, $2, $3) RETURNING*;",
      [username, body, review_id]
    )
    .then(({ rows }) => {
      console.log(rows);
      return rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteComment = (comment_id) => {
  return db
    .query("DELETE FROM comments WHERE comment_id = $1;", [comment_id])
    .then((res) => {
      return res;
    });
};
