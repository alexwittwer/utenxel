const mongoose = require("mongoose");
const Pantry = require("./pantry");
const Recipe = require("./recipe");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  pantry: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pantry",
      required: true,
      default: [],
    },
  ],
  savedRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      default: [],
    },
  ],
});
