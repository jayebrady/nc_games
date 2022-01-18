const express = require("express");
const {
  getCategories,
  postCategories,
} = require("./controllers/category.controllers");

const app = express();

app.get("/api/categories", getCategories);
// app.post("/api/categories", postCategories);

app.use(express.json());

module.exports = app;
