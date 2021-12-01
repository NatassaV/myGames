const db = require("../connection");

exports.selectReviewByID = (review_id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1;", [review_id])
    .then(({ rows }) => {
      return rows[0];
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateReviewByID = (review_id, { inc_votes }) => {
  return db
    .query(
      `UPDATE reviews SET votes= votes+$1 WHERE review_id= $2 RETURNING *;`,
      [inc_votes, review_id]
    )
    .then(({ rows }) => {
      return rows[0];
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.selectReviews = () => {
  return db.query("SELECT * FROM reviews;").then(({ rows }) => {
    return rows;
  });
};
