const db = require("../db/connection");

exports.selectCategories = () => {
  return db.query("SELECT * FROM categories;").then((result) => {
    return result.rows;
  });
};

exports.getReviewsById = (review_id) => {
  return db
    .query(
      `SELECT reviews.*, COUNT(comments.review_id) 
      AS comment_count 
      FROM reviews LEFT JOIN comments 
      ON reviews.review_id = comments.review_id 
      WHERE reviews.review_id = $1 GROUP BY reviews.review_id;`,
      [review_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
