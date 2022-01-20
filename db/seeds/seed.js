const format = require("pg-format");
const db = require("../connection.js");

const seed = (data) => {
  const { categoryData, reviewData, commentData, userData } = data;
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
      return db.query(`
    CREATE TABLE categories (
      slug TEXT PRIMARY KEY,
      description TEXT
    );
    `);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE users (
      username TEXT PRIMARY KEY,
      name TEXT,
      avatar_url TEXT
      );
      `);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE reviews (
      review_id SERIAL PRIMARY KEY,
      title TEXT,
      review_body TEXT,
      designer TEXT,
      review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      votes INT DEFAULT 0,
      category TEXT REFERENCES categories(slug),
      owner TEXT REFERENCES users(username),
      created_at TIMESTAMP DEFAULT NOW()
      );
      `);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author TEXT REFERENCES users(username),
      review_id INT REFERENCES reviews(review_id),
      votes INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW(),
      body TEXT
      );
      `);
    })
    .then(() => {
      const formattedCategories = categoryData.map((category) => [
        category.slug,
        category.description,
      ]);
      const categorySQL = format(
        `INSERT INTO categories (slug, description) VALUES %L RETURNING *;`,
        formattedCategories
      );
      return db.query(categorySQL);
    })
    .then(() => {
      const formattedUsers = userData.map((user) => [
        user.username,
        user.name,
        user.avatar_url,
      ]);
      const userSQL = format(
        `INSERT INTO users (username, name, avatar_url) VALUES %L RETURNING *;`,
        formattedUsers
      );
      return db.query(userSQL);
    })
    .then(() => {
      const formattedReviews = reviewData.map((review) => [
        review.title,
        review.designer,
        review.review_img_url,
        review.review_body,
        review.category,
        review.created_at,
        review.owner,
        review.votes,
      ]);
      const reviewSQL = format(
        `INSERT INTO reviews (title, review_body, designer, review_img_url, category, created_at, owner, votes) VALUES %L RETURNING *;`,
        formattedReviews
      );
      return db.query(reviewSQL);
    })
    .then(() => {
      const formattedComments = commentData.map((comment) => [
        comment.review_id,
        comment.author,
        comment.votes,
        comment.created_at,
        comment.body,
      ]);
      const commentSQL = format(
        `INSERT INTO comments (review_id, author, votes, created_at, body) VALUES %L RETURNING *;`,
        formattedComments
      );
      return db.query(commentSQL);
    });
};

module.exports = seed;
