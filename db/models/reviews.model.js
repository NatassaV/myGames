const db = require("../connection");

exports.selectReviewByID = (review_id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1;", [review_id])
    .then(({ rows }) => {
      console.log(rows);
      return rows[0];
    })
    .catch((err) => {
      console.log(err);
    });
};
