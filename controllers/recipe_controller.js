const Recipe = require("../models/recipe");
const Ingredient = require("../models/ingredient");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const asyncHandler = require("express-async-handler");

exports.recipe_get_all = asyncHandler(async (req, res) => {
  return res.json({ message: "This is the recipe_get_all controller" });
});
exports.recipe_get_single = asyncHandler(async (req, res) => {
  return res.json({ message: "This is the recipe_get_single controller" });
});
exports.recipe_create = asyncHandler(async (req, res) => {
  return res.json({ message: "This is the recipe_create controller" });
});
exports.recipe_update = asyncHandler(async (req, res) => {
  return res.json({ message: "This is the recipe_update controller" });
});
exports.recipe_delete = asyncHandler(async (req, res) => {
  return res.json({ message: "This is the recipe_delete controller" });
});
