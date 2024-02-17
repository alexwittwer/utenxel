const Recipe = require("../models/recipe");
const Ingredient = require("../models/ingredient");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const asyncHandler = require("express-async-handler");

exports.recipe_get_all = asyncHandler(async (req, res) => {
  try {
    const allRecipes = await Recipe.find().populate("ingredients").exec();

    if (!allRecipes) {
      return res.sendStatus(404);
    }

    return res.status(200).json(allRecipes);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500).json(err);
  }
});

exports.recipe_get_single = asyncHandler(async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeid)
      .populate("ingredients")
      .exec();

    if (!recipe) {
      return res.sendStatus(404);
    }

    return res.status(200).json(recipe);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
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
