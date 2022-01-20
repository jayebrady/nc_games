const {
  selectCategories,
  getReviewsById,
} = require("../models/categories.models");

exports.getCategories = (req, res) => {
  selectCategories().then((categories) => {
    res.status(200).send({ categories });
  });
};

exports.getReviewsById = (req, res) => {
  const { review_id } = req.params;
  getReviewsById(review_id).then((reviews) => {
    console.log(reviews);
    res.status(200).send({ reviews });
  });
};
