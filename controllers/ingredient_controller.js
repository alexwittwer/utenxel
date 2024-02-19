const { body, validationResult } = require("express-validator");
const passport = require("passport");
const asyncHandler = require("express-async-handler");
const Ingredient = require("../models/ingredient");

const url = "http://localhost:3000/api/ingredients/?page=";

exports.ingredient_get_all = asyncHandler(async (req, res) => {
  try {
    const count = await Ingredient.countDocuments();

    const { page = 1, name = "", type = "", limit = 20 } = req.query;

    if (name || type || limit) {
      const ingredients = await Ingredient.find({
        name: new RegExp(name, "i"),
        type: new RegExp(type, "i"),
      })
        .populate({
          path: "usedIn",
          select: "name",
        })
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ asc: 1 });

      if (!ingredients) {
        return res.sendStatus(404);
      }

      return res.status(200).json({
        results: ingredients,
        count: count,
        next:
          `${url}${parseInt(page) + 1}` +
          `${limit && "&limit=" + limit}` +
          `${name && "&name=" + name}` +
          `${type && "&type=" + type}`,
      });
    } else {
      const ingredients = await Ingredient.find().exec();
      return res.status(200).json({
        results: ingredients,
        count: count,
        next:
          `${url}${parseInt(page) + 1}` +
          `${limit && "&limit=" + limit}` +
          `${name && "&name=" + name}` +
          `${type && "&type=" + type}`,
      });
    }
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
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.user.user.isAdmin) {
      return res.sendStatus(403);
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
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      console.log(req.user);
      if (!req.user.user.isAdmin) {
        return res.sendStatus(403);
      }

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const ingredient = await Ingredient.findById(req.params.ingredientid);

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

exports.ingredient_delete = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res) => {
    if (!req.user.user.isAdmin) {
      return res.sendStatus(403);
    }

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
  }),
];
