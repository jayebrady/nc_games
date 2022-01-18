const { selectCategories } = require("../models/categories.models.js");

exports.getCategories = (req, res) => {
  selectCategories().then((categories) => {
    console.log(res.query);
    res.status(200).send({ categories });
  });
};
