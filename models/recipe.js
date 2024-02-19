const mongoose = require("mongoose");
const Ingredient = require("./ingredient");
const User = require("./user");

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
  published: {
    type: Boolean,
    default: false,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
