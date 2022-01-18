const format = require("pg-format");
const db = require("../connection");

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS reviews;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS categories;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`
    CREATE TABLE categories (
      slug_id SERIAL PRIMARY KEY,
      slug TEXT,
      description TEXT
    );
    `);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE users (
      username TEXT PRIMARY KEY,
      name TEXT,
      avatar_url VARCHAR(255)
      );
      `);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE reviews (
      review_id SERIAL PRIMARY KEY,
      title TEXT,
      designer TEXT,
      owner VARCHAR(40) REFERENCES users (username),
      review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      review_body TEXT,
      category INT REFERENCES categories(slug_id),
      created_at TIMESTAMP,
      votes INT DEFAULT 0
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
      created_at TIMESTAMP,
      body TEXT
      );
      `);
    })
    .then(() => {
      const formattedCategories = categoryData.map((category) => [
        category.slug,
        category.description,
      ]);
      const sql = format(
        `INSERT INTO categories (slug, description) VALUES %L RETURNING *;`,
        formattedCategories
      );
      return db.query(sql);
    });
};

module.exports = seed;
