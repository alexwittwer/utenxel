const mongoose = require("mongoose");
const Ingredient = require("./ingredient");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["vegan", "vegetarian", "pescatarian", "meat", "other"],
    required: true,
    default: "other",
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
    },
  ],
  instructions: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  favorites: {
    type: Number,
    default: 0,
  },
});
