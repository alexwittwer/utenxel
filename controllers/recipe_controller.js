const Recipe = require("../models/recipe");
const Ingredient = require("../models/ingredient");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const asyncHandler = require("express-async-handler");

exports.recipe_get_all = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, name = "", category = "" } = req.query;
  const count = await Recipe.countDocuments();
  try {
    const allRecipes = await Recipe.find({
      name: new RegExp(name, "i"),
      category: new RegExp(category, "i"),
    })
      .populate({
        path: "ingredients",
        select: "name -_id",
      })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    if (!allRecipes) {
      return res.sendStatus(404);
    }

    return res.status(200).json({
      results: allRecipes,
      count: count,
      next:
        `http://localhost:3000/api/recipes/?${
          page && "page=" + (parseInt(page) + 1)
        }` +
        `${limit && "&limit=" + limit}` +
        `${name && "&name=" + name}` +
        `${category && "&category=" + category}`,
    });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500).json(err);
  }
});

exports.recipe_get_single = asyncHandler(async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeid).populate({
      path: "ingredients",
      select: "name -_id",
    });

    if (!recipe) {
      return res.sendStatus(404);
    }

    return res.status(200).json(recipe);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

exports.recipe_create = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res) => {
    try {
      if (!req.user.user.isAdmin) {
        return res.sendStatus(403);
      }

      const ingredientNames = req.body.ingredients;
      const ingredientObjects = await Promise.all(
        ingredientNames.map(async (name) => {
          const ingredient = await Ingredient.findOne({ name });

          if (!ingredient) {
            console.error({ message: "Ingredient not found" });
            return res.sendStatus(404);
          }
          return ingredient;
        })
      );

      const newRecipe = new Recipe({
        name: req.body.name,
        ingredients: ingredientObjects,
        category: req.body.category,
        instructions: req.body.instructions,
        servings: req.body.servings,
        time: req.body.time,
        postedBy: req.user.user._id,
      });

      ingredientObjects.forEach(async (ingredient) => {
        ingredient.usedIn.push(newRecipe);
        await ingredient.save();
      });

      await newRecipe.save();
      return res.sendStatus(201);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }),
];

exports.recipe_update = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res) => {
    if (!req.user.user.isAdmin) {
      return res.sendStatus(403);
    }

    try {
      const recipe = await Recipe.findById(req.params.recipeid);

      const ingredientNames = req.body.ingredients;
      const ingredientObjects = await Promise.all(
        ingredientNames.map(async (name) => {
          const ingredient = await Ingredient.findOne({ name });

          if (!ingredient) {
            console.error({ message: "Ingredient not found" });
            return res.sendStatus(404);
          }
          return ingredient;
        })
      );

      if (!recipe) {
        return res.sendStatus(404);
      }

      recipe.name = req.body.name || recipe.name;
      recipe.ingredients = ingredientObjects
        ? ingredientObjects
        : recipe.ingredients;
      recipe.category = req.body.category || recipe.category;
      recipe.instructions = req.body.instructions || recipe.instructions;
      recipe.servings = req.body.servings || recipe.servings;
      recipe.time = req.body.time || recipe.time;
      recipe.favorites = req.body.favorites || recipe.favorites;

      await recipe.save();
      return res.sendStatus(204);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }),
];

exports.recipe_delete = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res) => {
    if (!req.user.user.isAdmin) {
      return res.sendStatus(403);
    }

    try {
      const recipe = await Recipe.findByIdAndDelete(req.params.recipeid);

      if (!recipe) {
        return res.sendStatus(404);
      }

      return res.sendStatus(204);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }),
];
