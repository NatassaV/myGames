const { bindComplete } = require("pg-protocol/dist/messages");
const db = require("../db/connection");

exports.selectReviewByID = (review_id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1;", [review_id])
    .then(({ rows }) => {
      if (!rows[0]) {
        Promise.reject({ status: 404, msg: "review not found" });
      }
      return rows[0];
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
    });
};

exports.selectReviews = (sort_by = "created_at", order = "DESC", category) => {
  console.log(sort_by);
  if (
    ![
      "owner",
      "title",
      "review_id",
      "category",
      "created_at",
      "votes",
      "comment_count",
    ].includes(sort_by)
  ) {
    return Promise.reject({
      status: 400,
      msg: `Sorry, sorting by ${sort_by} isn't valid`,
    });
  } else if (!category) {
    return db
      .query(`SELECT * FROM reviews ORDER BY ${sort_by} ${order} ;`)
      .then(({ rows }) => {
        return rows;
      });
  } else {
    return db
      .query(
        `SELECT * FROM reviews WHERE category = $1 ORDER BY ${sort_by} ${order} ;`,
        [category]
      )
      .then(({ rows }) => {
        return rows;
      });
  }
};

// exports.myTest = (review_id) => {
//   return db
//     .query(`SELECT review_id, COUNT $1 FROM comments GROUP BY review_id`, [
//       review_id,
//     ])
//     .then(({ rows }) => {
//       console.log(rows);
//     });
// };
