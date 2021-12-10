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
      "designer",
      "votes",
      "comment_count",
    ].includes(sort_by)
  ) {
    return Promise.reject({
      err: {
        status: 400,
        msg: `Sorry, sorting by that isn't valid`,
      },
    });
  } else if (!category) {
    return db
      .query(
        `SELECT reviews.*, COUNT(comment_id) AS comment_count
      FROM reviews 
      LEFT JOIN comments ON comments.review_id = reviews.review_id 
      GROUP BY reviews.review_id 
      ORDER BY ${sort_by} ${order} ;`
      )
      .then(({ rows }) => {
        return rows;
      });
  } else {
    return db
      .query(
        `SELECT reviews.*, COUNT(comment_id) AS comment_count
        FROM reviews WHERE category = $1
        LEFT JOIN comments ON comments.review_id = reviews.review_id 
        GROUP BY reviews.review_id ORDER BY ${sort_by} ${order} ;`,
        [category]
      )
      .then(({ rows }) => {
        return rows;
      });
  }
};

exports.getAtable = (table_name) => {
  if (["comments", "reviews", "categories"].includes(table_name)) {
    return db.query(`SELECT * FROM ${table_name};`).then(({ rows }) => {
      return rows;
    });
  } else {
    return Promise.reject({
      err: {
        status: 400,
        msg: `Sorry, invalid table`,
      },
    });
  }
};
