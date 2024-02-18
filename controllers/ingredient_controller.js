const { body, validationResult } = require("express-validator");
const passport = require("passport");
const asyncHandler = require("express-async-handler");
const Ingredient = require("../models/ingredient");
const User = require("../models/user");
const UserAuth = require("../models/userauth");
const Recipe = require("../models/recipe");
const Pantry = require("../models/pantry");

exports.ingredient_get_all = asyncHandler(async (req, res) => {
  try {
    const allIngredients = await Ingredient.find().exec();

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
    const ingredient = await Ingredient.findById(
      req.params.ingredientid
    ).exec();

    if (!ingredient) {
      return res.sendStatus(404);
    }

    return res.status(200).json(ingredient);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

exports.ingredient_create = [
  body("name").trim().notEmpty().withMessage("Please enter a name").escape(),
  body("type").trim().notEmpty().withMessage("Please enter a type").escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const allIngredients = await Ingredient.find();

      if (allIngredients.some((item) => item.name === req.body.name)) {
        console.error({ message: "Ingredient already exists" });
        return res.sendStatus(409);
      }

      const newIngredient = new Ingredient({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description || "",
      });

      await newIngredient.save();
      return res.status(201).json(newIngredient);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }),
];

exports.ingredient_update = [
  body("name").trim().notEmpty().withMessage("Please enter a name").escape(),
  body("type").trim().notEmpty().withMessage("Please enter a type").escape(),

  asyncHandler(async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const ingredient = await Ingredient.findById(
        req.params.ingredientid
      ).exec();

      if (!ingredient) {
        return res.sendStatus(404);
      }

      ingredient.name = req.body.name || ingredient.name;
      ingredient.type = req.body.type || ingredient.type;
      ingredient.description = req.body.description || ingredient.description;

      await ingredient.save();
      return res.status(200).json(ingredient);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }),
];

exports.ingredient_delete = asyncHandler(async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndDelete(
      req.params.ingredientid
    ).exec();

    if (!ingredient) {
      return res.sendStatus(404);
    }

    return res.status(200).json({ message: "Ingredient deleted" });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});
