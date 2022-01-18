const express = require("express");
const { getCategories } = require("./controllers/category.controllers");

const app = express();

//create controller file/folder

app.get("/api/categories", getCategories);
