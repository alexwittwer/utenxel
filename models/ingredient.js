const mongoose = require("mongoose");
const Recipe = require("./recipe");

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["protein", "spice", "staple", "special", "other"],
    default: "other",
    required: true,
  },
  usedIn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Ingredient", ingredientSchema);
