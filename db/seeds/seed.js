const db = require("../connection");
const format = require("pg-format");

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  return db
    .query(`DROP TABLE IF EXISTS categories;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS reviews;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS comments;`);
    })
    .then(() => {
      return db.query(`CREATE TABLE categories (
        slug VARCHAR UNIQUE NOT NULL PRIMARY KEY,
        description VARCHAR(150)
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
        username UNIQUE NOT NULL PRIMARY KEY,
        avatar_url ,
        name VARCHAR
      );`);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO categories
        (slug, description)
        VALUES %L
        RETURNING *;`,
        categoryData.map((cat) => [cat.slug, cat.description])
      );
      return db.query(queryStr);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO users
        (username,
        avatar_url,
        name)
        VALUES %L
        RETURNING *;`,
        userData.map((user) => [user.username, user.avatar_url, user.name])
      );
      return db.query(queryStr);
    })
    .then(() => {
      return db.query(`CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        title VARCHAR(100),
        review_body TEXT,
        designer VARCHAR(100),
        review_img_url VARCHAR(200) DEFAULT "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
        votes INT DEFAULT 0,
        category VARCHAR REFERENCES categories(slug),
        owner REFERENCES users(username),
        created_at DATE DEFAULT CURRENT_TIMESTAMP,
        body TEXT
      );`);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO reviews
        (title, review_body, designer, review_img_url, votes, category, owner, created_at, body)
        VALUES %L
        RETURNING *;`,
        reviewData.map((rev) => [
          rev.title,
          rev.review_body,
          rev.designer,
          rev.review_img_url,
          rev.votes,
          rev.category,
          rev.owner,
          rev.created_at,
          rev.body,
        ])
      );
      return db.query(queryStr);
    })
    .then(() => {
      return db.query(
        `CREATE TABLE comments (
          comment_id SERIAL PRIMARY KEY,
          author REFERENCES user(username),
          review_id REFERENCES review(review_id),
          votes INT DEFAULT 0,
          created_at DATE DEFAULT CURRENT_TIMESTAMP,
          body TEXT
        );`
      );
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO comments
        (author, review_id, votes, created_at, body)
        VALUES %L
        RETURNING *;`,
        commentData.map((com) => [
          com.author,
          com.review_id,
          com.votes,
          com.created_at,
          com.body,
        ])
      );
      return db.query(queryStr);
    });
};

module.exports = seed;
