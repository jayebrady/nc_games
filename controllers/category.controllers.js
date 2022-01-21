const {
  selectCategories,
  getReviewsById,
} = require("../models/categories.models");

exports.getCategories = (req, res) => {
  selectCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => {
      res.status(500).send({ msg: "Internal server error" });
    });
};

exports.getReviewsById = (req, res) => {
  const { review_id } = req.params;
  getReviewsById(review_id)
    .then((reviews) => {
      if (reviews) {
        res.status(200).send({ reviews });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      if (err.code === "22P02") {
        res.status(400).send({ msg: "Bad request" });
      } else if (err.status) {
        res.status(err.status).send({ msg: err.msg });
      } else {
        res.status(500).send({ msg: "Internal server error" });
      }
    });
};
