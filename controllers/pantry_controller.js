const passport = require("passport");
const asyncHandler = require("express-async-handler");
const Pantry = require("../models/pantry");
const Ingredient = require("../models/ingredient");

exports.pantry_get_single = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res) => {
    try {
      const pantry = await Pantry.findOne({
        user: req.user.user.userid,
      }).populate({
        path: "ingredients",
        select: "name description -_id",
      });

      if (!pantry) {
        return res.sendStatus(404);
      }

      return res.status(200).json(pantry);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }),
];

exports.pantry_add = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res) => {
    try {
      const ingredient = await Ingredient.find({ name: req.body.name }).exec();
      const pantry = await Pantry.findOne({
        user: req.user.user.userid,
      }).populate({
        path: "ingredients",
        select: "name description -_id",
      });

      if (!ingredient) {
        console.error({ message: "Ingredient not found" });
        return res.sendStatus(404);
      }

      if (!pantry) {
        console.error({ message: "User not found" });
        return res.sendStatus(404);
      }

      if (pantry.ingredients.some((item) => item.name === req.body.name)) {
        console.error({ message: "Ingredient already exists in pantry" });
        return res.sendStatus(409);
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
      const pantry = await Pantry.findOne({ user: req.user.user.userid })
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

      if (!pantry.ingredients.some((item) => item.name === req.body.name)) {
        console.error({ message: "Ingredient not found in pantry" });
        return res.sendStatus(404);
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
