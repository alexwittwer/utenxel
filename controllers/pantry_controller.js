const { body, validationResult } = require("express-validator");
const passport = require("passport");
const asyncHandler = require("express-async-handler");
const Pantry = require("../models/pantry");
const Ingredient = require("../models/ingredient");

exports.pantry_get_all = asyncHandler(async (req, res) => {
  try {
    const allPantry = await Pantry.find().populate().exec();

    if (allPantry != null) {
      return res.status(200).json(allPantry);
    }

    return res.sendStatus(404);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

exports.pantry_get_single = asyncHandler(async (req, res) => {
  try {
    const pantry = await Pantry.findOne({ user: req.user._id })
      .populate()
      .exec();

    if (!pantry) {
      return res.sendStatus(404);
    }

    return res.status(200).json(pantry);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

exports.pantry_add = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res) => {
    try {
      const ingredient = await Ingredient.findById(
        req.params.ingredientid
      ).exec();
      const pantry = await Pantry.findOne({ user: req.user._id }).exec();

      if (!ingredient || !pantry) {
        return res.sendStatus(404);
      }

      pantry.ingredients.push(ingredient);
      await pantry.save();
      return res.status(201).json(pantry);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }),
];

exports.pantry_delete = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res) => {
    try {
      const pantry = await Pantry.findOne({ user: req.user._id })
        .populate()
        .exec();
      const ingredient = await Ingredient.findById(
        req.params.ingredientid
      ).exec();

      if (!pantry) {
        return res.sendStatus(404);
      }

      pantry.ingredients = pantry.ingredients.filter(
        (ingredient) => req.params.ingredientid !== ingredient._id
      );

      await pantry.save();
      return res.status(200).json(pantry);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }),
];
