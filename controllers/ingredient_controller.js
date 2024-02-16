const { body, validationResult } = require("express-validator");
const passport = require("passport");
const asyncHandler = require("express-async-handler");

exports.ingredient_get_all = asyncHandler(async (req, res) => {
  return res.json({ message: "This is the ingredient_get_all controller" });
});
exports.ingredient_get_single = asyncHandler(async (req, res) => {
  return res.json({ message: "This is the ingredient_get_single controller" });
});
exports.ingredient_create = asyncHandler(async (req, res) => {
  return res.json({ message: "This is the ingredient_create controller" });
});
exports.ingredient_update = asyncHandler(async (req, res) => {
  return res.json({ message: "This is the ingredient_update controller" });
});
exports.ingredient_delete = asyncHandler(async (req, res) => {
  return res.json({ message: "This is the ingredient_delete controller" });
});
