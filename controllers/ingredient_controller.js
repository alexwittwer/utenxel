const { body, validationResult } = require("express-validator");
const passport = require("passport");
const asyncHandler = require("express-async-handler");
const Ingredient = require("../models/ingredient");

exports.ingredient_get_all = asyncHandler(async (req, res) => {
  try {
    const allIngredients = await ingredient.find().exec();

    if (!allIngredients) {
      return res.sendStatus(404);
    }

    return res.status(200).json(allIngredients);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

exports.ingredient_get_single = asyncHandler(async (req, res) => {
  try {
    const ingredient = await ingredient
      .findById(req.params.ingredientid)
      .exec();

    if (!ingredient) {
      return res.sendStatus(404);
    }

    return res.status(200).json(ingredient);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
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
