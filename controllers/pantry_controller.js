const { body, validationResult } = require("express-validator");
const passport = require("passport");
const asyncHandler = require("express-async-handler");
const Pantry = require("../models/pantry");
const Ingredient = require("../models/ingredient");

exports.pantry_get_all = asyncHandler(async (req, res) => {
  try {
    const allPantry = await Pantry.find()
      .populate({
        path: "ingredients",
        select: "name description type -_id",
      })
      .populate({ path: "user", select: "name -_id" });

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
      const ingredient = await Ingredient.find({ name: req.body.name }).exec();
      const pantry = await Pantry.findOne({ user: req.params.userid }).populate(
        {
          path: "ingredients",
          select: "name description -_id",
        }
      );

      if (!ingredient) {
        console.error({ message: "Ingredient not found" });
        return res.sendStatus(404);
      }

      if (!pantry) {
        console.error({ message: "User not found" });
        return res.sendStatus(404);
      }

      pantry.ingredients.push(...ingredient);
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
      const pantry = await Pantry.findOne({ user: req.params.userid })
        .populate("ingredients")
        .exec();
      const ingredient = await Ingredient.findOne({
        name: req.body.name,
      }).exec();

      if (!pantry) {
        console.error({ message: "Pantry not found" });
        return res.sendStatus(404);
      }

      if (!ingredient) {
        console.error({ message: "Ingredient not found" });
      }

      pantry.ingredients = pantry.ingredients.filter(
        (ingredient) => req.body.name !== ingredient.name
      );

      await pantry.save();
      return res.status(200).json(pantry);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }),
];
