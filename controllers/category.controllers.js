const {
  selectCategories,
  getReviewsById,
} = require("../models/categories.models");

exports.getCategories = (req, res) => {
  selectCategories().then((categories) => {
    console.log(res.query);
    res.status(200).send({ categories });
  });
};

exports.getReviewsById = (req, res) => {
  console.log("in here");
  const { review_id } = req.params;
  getReviewsById(review_id).then((reviews) => {
    console.log(reviews);
    res.status(200).send({ reviews });
  });
};
