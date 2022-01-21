const express = require("express");
const {
  getCategories,
  getReviewsById,
} = require("./controllers/category.controllers");
const {
  handle404s,
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./errors/errors");

const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewsById);

app.use(handlePsqlErrors);
// app.use(handleServerErrors);
// app.use(handleCustomErrors);

module.exports = app;
