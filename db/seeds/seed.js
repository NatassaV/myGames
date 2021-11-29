const db = require("../connection");
const format = require("pg-format");

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS reviews;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS categories;`);
    })
    .then(() => {
      return db.query(`CREATE TABLE categories (
        slug VARCHAR PRIMARY KEY,
        description VARCHAR(150)
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
        username VARCHAR(100) PRIMARY KEY,
        avatar_url VARCHAR(255),
        name VARCHAR(100)
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
        review_img_url VARCHAR(200) DEFAULT "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg" NOT NULL,
        votes INT DEFAULT 0 NOT NULL,
        category VARCHAR REFERENCES categories(slug),
        owner VARCHAR(100) REFERENCES users(username) ON DELETE CASCADE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );`);
    });

  /////////////error: cannot use column reference in DEFAULT expression//

  // .then(() => {
  //   const queryStr = format(
  //     `INSERT INTO reviews
  //   (title, review_body, designer, review_img_url, votes, category, owner, created_at, body)
  //   VALUES %L
  //   RETURNING *;`,
  //     reviewData.map((rev) => [
  //       rev.title,
  //       rev.review_body,
  //       rev.designer,
  //       rev.review_img_url,
  //       rev.votes,
  //       rev.category,
  //       rev.owner,
  //       rev.created_at,
  //       rev.body,
  //     ])
  //   );
  //   return db.query(queryStr);
  // })
  // .then(() => {
  //   return db.query(
  //     `CREATE TABLE comments (
  //     comment_id SERIAL PRIMARY KEY,
  //     author VARCHAR REFERENCES user(username),
  //     review_id INT REFERENCES review(review_id),
  //     votes INT DEFAULT 0,
  //     created_at TIMESTAMP DEFAULT now(),
  //     body TEXT
  //   );`
  //   );
  // })
  // .then(() => {
  //   const queryStr = format(
  //     `INSERT INTO comments
  //   (author, review_id, votes, created_at, body)
  //   VALUES %L
  //   RETURNING *;`,
  //     commentData.map((com) => [
  //       com.author,
  //       com.review_id,
  //       com.votes,
  //       com.created_at,
  //       com.body,
  //     ])
  //   );
  //   return db.query(queryStr);
  // });
};

module.exports = seed;
