const express = require("express");

const categoriesRouter = express.Router();
const { getCategories } = require("../controllers/categories.controller");

categoriesRouter.route("/").get(getCategories);
console.log("inside cat router");

module.exports = categoriesRouter;
