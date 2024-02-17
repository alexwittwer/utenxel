const User = require("../models/user");
const Ingredient = require("../models/ingredient");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const asyncHandler = require("express-async-handler");
const Pantry = require("../models/pantry");

exports.pantry_get_all = asyncHandler(async (req, res) => {
  try {
    const allPantry = await Pantry.find().exec();

    if (allPantry != null) {
      return res.status(200).json(allPantry);
    }

    return res.sendStatus(404);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500).json(err);
  }
});

exports.pantry_get_single = asyncHandler(async (req, res) => {
  try {
    const pantry = await Pantry.findById(req.params.pantryid).exec();

    if (!pantry) {
      return res.sendStatus(404);
    }

    return res.status(200).json(pantry);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

exports.pantry_create = asyncHandler(async (req, res) => {});

exports.pantry_update = asyncHandler(async (req, res) => {
  return res.json({ message: "This is the pantry_update controller" });
});

exports.pantry_delete = asyncHandler(async (req, res) => {
  return res.json({ message: "This is the pantry_delete controller" });
});
