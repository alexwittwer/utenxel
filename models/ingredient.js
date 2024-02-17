const mongoose = require("mongoose");
const Recipe = require("./recipe");

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "protein",
      "vegetable",
      "fruit",
      "spice",
      "staple",
      "special",
      "other",
    ],
    default: "other",
    required: true,
  },
  description: {
    type: String,
  },
  usedIn: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

module.exports = mongoose.model("Ingredient", ingredientSchema);
